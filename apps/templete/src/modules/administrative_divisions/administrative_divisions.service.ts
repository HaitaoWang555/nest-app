import { Injectable, Logger } from '@nestjs/common';
import { CreateAdministrativeDivisionsDto } from './dto/create-administrative_divisions.dto';
import { UpdateAdministrativeDivisionsDto } from './dto/update-administrative_divisions.dto';
import { SearchAdministrativeDivisionsDto } from './dto/search-administrative_divisions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Equal, Like, TreeRepository } from 'typeorm';
import { AdministrativeDivisions } from './entities/administrative_divisions.entity';
import { ApiException, PageInfo, readLinesFromFile } from '@libs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class AdministrativeDivisionsService {
  private readonly logger = new Logger(AdministrativeDivisionsService.name);
  private readonly REDIS_KEY: string = 'ADMINISTRATIVE_DIVISIONS';
  constructor(
    @InjectRepository(AdministrativeDivisions)
    private administrative_divisionsRepository: TreeRepository<AdministrativeDivisions>,
    private dataSource: DataSource,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async query(searchAdministrativeDivisionsDto: SearchAdministrativeDivisionsDto) {
    const data = await this.administrative_divisionsRepository.findAndCount({
      where: {
        code: searchAdministrativeDivisionsDto.code && Equal(searchAdministrativeDivisionsDto.code),
        name: searchAdministrativeDivisionsDto.name && Like('%' + searchAdministrativeDivisionsDto.name + '%'),
      },
      skip: (searchAdministrativeDivisionsDto.pageNum - 1) * searchAdministrativeDivisionsDto.pageSize,
      take: searchAdministrativeDivisionsDto.pageSize,
    });

    return new PageInfo(
      searchAdministrativeDivisionsDto.pageNum,
      searchAdministrativeDivisionsDto.pageSize,
      data[1],
      data[0],
    );
  }

  create(createAdministrativeDivisionsDto: CreateAdministrativeDivisionsDto) {
    return this.administrative_divisionsRepository.save(createAdministrativeDivisionsDto);
  }

  async import(file: Express.Multer.File) {
    const lines = await readLinesFromFile(file.path);

    let data: AdministrativeDivisions[] = [];
    const bigData: AdministrativeDivisions[][] = [];
    lines.splice(0, 1);
    const splitNum = 20000;
    const isBig = lines.length > splitNum;
    const BigDataLength = Math.floor(lines.length / splitNum);
    const residueLength = lines.length - BigDataLength * splitNum;
    lines.forEach((iterator, index) => {
      // '12,"天津市"'
      const obj = new AdministrativeDivisions();
      obj.code = iterator[0];
      obj.name = iterator[1].replaceAll('"', '');
      if (!this.validatorAdministrativeDivisions(obj)) {
        throw new ApiException(`第${index + 1}行格式错误！${iterator}`);
      }
      if (iterator.length > 2) {
        obj.parent = { code: iterator[2] } as AdministrativeDivisions;
      }
      data.push(obj);
      if (isBig && (data.length === splitNum || (bigData.length === BigDataLength && data.length === residueLength))) {
        bigData.push(data);
        data = [];
      }
    });

    if (isBig) {
      for await (const iterator of bigData) {
        await this.saveAll(iterator);
      }
    } else {
      this.saveAll(data);
    }
  }

  async saveAll(data: AdministrativeDivisions[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.administrative_divisionsRepository.save(data);
      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.administrative_divisionsRepository.find();
  }

  async findTree() {
    const hasKey = (await this.redis.exists(this.REDIS_KEY)) === 1;
    let data: AdministrativeDivisions[] = [];
    if (hasKey) {
      const cache = await this.redis.get(this.REDIS_KEY);
      if (cache) data = JSON.parse(cache);
    } else {
      data = await this.administrative_divisionsRepository.findTrees({ depth: 2 });
      this.redis.set(this.REDIS_KEY, JSON.stringify(data));
    }
    return data;
  }

  async deleteTreeCache() {
    const hasKey = (await this.redis.exists(this.REDIS_KEY)) === 1;
    return hasKey && this.redis.del(this.REDIS_KEY);
  }

  findChild(code: string) {
    return this.administrative_divisionsRepository.findDescendantsTree({ code } as AdministrativeDivisions, {
      depth: 1,
    });
  }

  findOne(code: string) {
    return this.administrative_divisionsRepository.findOneBy({ code: code });
  }

  update(code: string, updateAdministrativeDivisionsDto: UpdateAdministrativeDivisionsDto) {
    return this.administrative_divisionsRepository.update({ code: code }, updateAdministrativeDivisionsDto);
  }

  remove(ids: string[]) {
    return this.administrative_divisionsRepository.delete(ids);
  }

  validatorAdministrativeDivisions(obj: AdministrativeDivisions) {
    if (!obj) return false;
    if (!obj.code) return false;
    if (!obj.name) return false;

    return true;
  }
}
