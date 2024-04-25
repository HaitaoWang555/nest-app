import { Module } from '@nestjs/common';
import { RedisModule as DefaultRedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    DefaultRedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${Number(process.env.REDIS_PORT)}`,
      options: {
        commandTimeout: Number(process.env.REDIS_COMMAND_TIMEOUT) || 200,
        maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES_PERREQUEST) || 2,
      },
    }),
  ],
})
export class RedisModule {}
