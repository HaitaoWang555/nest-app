import { Controller, Get, Delete, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from './redis.service';
import { CreateRedisDto } from './dto/create-redis.dto';

@ApiTags('redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  /**
   * 获取Redis信息
   */
  @Get('info')
  getInfo() {
    return this.redisService.getInfo();
  }

  /**
   * 获取所有缓存Key的固定前缀
   */
  @Get()
  findAllPrefixKeys() {
    return this.redisService.getPrefixKeys();
  }

  /**
   * 获取以此前缀开头的Key
   */
  @Get(':prefix')
  findAllGroupKeys(@Param('prefix') prefix: string) {
    return this.redisService.getGroupKeys(prefix);
  }

  /**
   * 通过完整的Key获取值
   */
  @Get(':key/:type')
  getValue(@Param('key') key: string, @Param('type') type: string) {
    return this.redisService.getValue(key, type);
  }

  /**
   * 通过完整的Key设置值
   */
  @Post('/set')
  setValue(@Body() createRedisDto: CreateRedisDto) {
    return this.redisService.setValue(createRedisDto);
  }

  /**
   * 删除缓存组
   */
  @Delete('/group/:prefix')
  removeGroup(@Param('prefix') prefix: string) {
    return this.redisService.removeGroup(prefix);
  }

  /**
   * 删除具体单个Key
   */
  @Delete('/single/:key')
  removeSingle(@Param('key') key: string) {
    return this.redisService.removeSingle(key);
  }

  /**
   * 删除所有缓存
   */
  @Delete('/all')
  removeAll() {
    return this.redisService.removeAll();
  }
}
