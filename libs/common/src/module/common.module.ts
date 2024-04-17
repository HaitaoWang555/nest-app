import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sep } from 'path';

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
  ],
})
export class CommonModule {}
