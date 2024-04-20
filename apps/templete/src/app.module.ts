import { Module } from '@nestjs/common';
import * as modules from './modules';
import { CommonModule } from '@libs/common';
import { TypeormSqliteModule } from '@libs/typeorm';
import { RedisModule } from '@libs/redis';

@Module({
  imports: [CommonModule, TypeormSqliteModule, RedisModule, ...Object.values(modules)],
})
export class AppModule {}
