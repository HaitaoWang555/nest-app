import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { sep } from 'path';
import { getWinstonOptions } from '../utils/winston-options';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? `${__dirname}${sep}.env`.replace(sep + 'dist', '')
    : `${__dirname}${sep}.env.${process.env.NODE_ENV}`.replace(sep + 'dist', '');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    WinstonModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return getWinstonOptions(config);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class CommonModule {}
