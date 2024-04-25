import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { sep } from 'path';
import { getWinstonOptions } from '../utils/winston-options';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { VersionController } from './version.controller';

let envFilePath =
  process.env.NODE_ENV === 'production'
    ? `${__dirname}${sep}.env`.replace(sep + 'dist', '')
    : `${__dirname}${sep}.env.${process.env.NODE_ENV}`.replace(sep + 'dist', '');

if (process.env.NODE_ENV === 'test') {
  envFilePath = `${process.env.TEST_ROOT_DIR}${sep}.env.${process.env.NODE_ENV}`;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => {
        return getWinstonOptions();
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
  controllers: [VersionController],
})
export class CommonModule {}
