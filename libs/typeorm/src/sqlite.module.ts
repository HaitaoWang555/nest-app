import { Module } from '@nestjs/common';
import { TypeOrmModule as DefaultTypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { sep } from 'path';
import type { LoggerOptions } from 'typeorm';

let dbPath = `${__dirname}${sep}`.replace(sep + 'dist', '');
let logging: LoggerOptions = process.env.NODE_ENV === 'production' ? ['error', 'warn', 'schema'] : true;
if (process.env.NODE_ENV === 'test') {
  dbPath = process.env.TEST_ROOT_DIR;
  logging = false;
}

@Module({
  imports: [
    DefaultTypeOrmModule.forRoot({
      type: 'sqlite',
      database: dbPath + process.env.SQLITE_DB,
      autoLoadEntities: true,
      logging: logging,
      synchronize: process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === '1',
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class TypeormSqliteModule {}
