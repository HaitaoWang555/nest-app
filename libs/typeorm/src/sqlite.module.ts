import { Module } from '@nestjs/common';
import { TypeOrmModule as DefaultTypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { sep } from 'path';

const dbPath = `${__dirname}${sep}`.replace(sep + 'dist', '');

@Module({
  imports: [
    DefaultTypeOrmModule.forRoot({
      type: 'sqlite',
      database: dbPath + process.env.SQLITE_DB,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'schema'] : true,
      synchronize: process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === '1',
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class TypeormSqliteModule {}
