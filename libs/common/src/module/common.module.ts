import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { sep } from 'path';
import { getWinstonOptions } from '../utils/winston-options';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? `${__dirname}${sep}.env`.replace(sep + 'dist', '')
    : `${__dirname}${sep}.env.${process.env.NODE_ENV}`.replace(sep + 'dist', '');

console.log(envFilePath);

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
})
export class CommonModule {}
