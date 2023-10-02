import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AdministrativeDivisionsService } from './administrative_divisions.service';
import { CreateAdministrativeDivisionsDto } from './dto/create-administrative_divisions.dto';
import { UpdateAdministrativeDivisionsDto } from './dto/update-administrative_divisions.dto';
import { SearchAdministrativeDivisionsDto } from './dto/search-administrative_divisions.dto';
import { ApiPaginatedResponse, IsNotObjectEmpty } from '@libs/common';
import { AdministrativeDivisions } from './entities/administrative_divisions.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('administrative_divisions')
@Controller('administrative_divisions')
export class AdministrativeDivisionsController {
  constructor(private readonly administrative_divisionsService: AdministrativeDivisionsService) {}

  /**
   * 分页查询
   */
  @Get('/query')
  @ApiPaginatedResponse(AdministrativeDivisions)
  query(@Query() searchAdministrativeDivisionsDto: SearchAdministrativeDivisionsDto) {
    return this.administrative_divisionsService.query(searchAdministrativeDivisionsDto);
  }

  /**
   * 创建行政区划
   */
  @Post()
  create(@Body() createAdministrativeDivisionsDto: CreateAdministrativeDivisionsDto) {
    return this.administrative_divisionsService.create(createAdministrativeDivisionsDto);
  }

  /**
   * 导入行政区划
   */
  @Post('import')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @UseInterceptors(
    FileInterceptor('file', {
      dest: '.temp',
    }),
  )
  import(@UploadedFile() file: Express.Multer.File) {
    return this.administrative_divisionsService.import(file);
  }

  /**
   * 获取所有行政区划
   */
  @Get()
  findAll() {
    return this.administrative_divisionsService.findAll();
  }

  /**
   * 获取所有行政区划树形
   */
  @Get('tree')
  findTree() {
    return this.administrative_divisionsService.findTree();
  }

  /**
   * 删除所有行政区划树形
   */
  @Delete('tree')
  deleteTreeCache() {
    return this.administrative_divisionsService.deleteTreeCache();
  }

  /**
   * 通过 code 获取行政区划
   */
  @Get('/child/:code')
  findChild(@Param('code') code: string) {
    return this.administrative_divisionsService.findChild(code);
  }

  /**
   * 通过 code 获取行政区划
   */
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.administrative_divisionsService.findOne(code);
  }

  /**
   * 更新行政区划
   */
  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body(new IsNotObjectEmpty()) updateAdministrativeDivisionsDto: UpdateAdministrativeDivisionsDto,
  ) {
    return this.administrative_divisionsService.update(code, updateAdministrativeDivisionsDto);
  }

  /**
   * 删除行政区划
   */
  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.administrative_divisionsService.remove(code.split(',').map((i) => i));
  }
}
