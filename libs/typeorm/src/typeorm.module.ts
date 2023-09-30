import { Module } from '@nestjs/common';
import { TypeOrmModule as DefaultTypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';

@Module({
  imports: [
    DefaultTypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      autoLoadEntities: true,
      logging: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'schema'] : true,
      synchronize: process.env.SYNCHRONIZE && process.env.SYNCHRONIZE === '1',
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class TypeormModule {}
