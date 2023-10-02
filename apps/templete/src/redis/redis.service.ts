import { InjectRedis } from '@libs/redis/redis.decorators';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { parse } from 'redis-info';
import { ApiException } from '@libs/common';
import { CreateRedisDto } from './dto/create-redis.dto';

@Injectable()
export class RedisService {
  private readonly REDIS_LIST: string;
  private readonly REDIS_STRING: string;

  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {
    this.REDIS_LIST = 'REDIS_LIST';
    this.REDIS_STRING = 'REDIS_STRING';
  }

  async getInfo() {
    const info = await this.redis.info();
    return parse(info);
  }

  async getPrefixKeys() {
    return [
      {
        label: 'LIST',
        value: this.REDIS_LIST,
        type: 'list',
      },
      {
        label: 'STRING',
        value: this.REDIS_STRING,
        type: 'string',
      },
    ];
  }

  getGroupKeys(key: string) {
    return this.redis.keys(key + '*');
  }

  async getValue(key: string, type: string) {
    const hasKey = (await this.redis.exists(key)) === 1;
    if (!hasKey) throw new ApiException('此Key不存在！');
    switch (type) {
      case 'list':
        return this.redis.lrange(key, 0, -1);
      case 'string':
        return this.redis.get(key);
      case 'hash':
        return this.redis.hgetall(key);
      case 'set':
        return this.redis.smembers(key);
      case 'zset':
        return this.redis.zrange(key, 0, -1);
      default:
        return this.redis.get(key);
    }
  }

  async setValue(createRedisDto: CreateRedisDto) {
    // key: string, type: string, value: any
    const { key, type, value } = createRedisDto;
    const hasKey = (await this.redis.exists(key)) === 1;
    if (hasKey) await this.removeSingle(key);
    switch (type) {
      case 'list':
        return this.redis.lpush(key, ...value);
      case 'string':
        return this.redis.set(key, value);
      case 'hash':
        /**
         * 批量新增字段及对应的值
         * redis.hmset('myhash', {field1: 'value1',field2: 'value2'});
         */
        return this.redis.hmset(key, value);
      case 'set':
        /**
         * 添加多个成员到指定的 Set
         * redis.sadd('myset', ['member1', 'member2', 'member3']);
         */
        return this.redis.sadd(key, value);
      case 'zset':
        /**
         * 添加多个成员及其对应的分数到指定的 ZSet
         * redis.zadd('myzset', [3, 'member3',4, 'member4']);
         */
        return this.redis.zadd(key, value);
    }
  }

  removeGroup(key: string) {
    return this.redis.del(key + '*');
  }

  removeSingle(key: string) {
    return this.redis.del(key);
  }

  removeAll() {
    return this.redis.flushall();
  }
}
