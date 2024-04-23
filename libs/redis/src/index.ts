import { Module } from '@nestjs/common';
import { RedisModule as DefaultRedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    DefaultRedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${Number(process.env.REDIS_PORT)}`,
    }),
  ],
})
export class RedisModule {}
