import { Module } from '@nestjs/common';
import { RedisModule as DefaultRedisModule } from './redis.module';

@Module({
  imports: [
    DefaultRedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        username: 'default',
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
})
export class RedisModule {}
