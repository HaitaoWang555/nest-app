import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as modules from './modules';
import { CommonModule } from '@libs/common';
import { TypeormModule } from '@libs/typeorm';
import { RedisModule as DefaultRedisModule } from '@libs/redis';
import { AppInterceptor } from './app.interceptor';

@Module({
  imports: [CommonModule, TypeormModule, DefaultRedisModule, ...Object.values(modules)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
