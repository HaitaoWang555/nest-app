import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? `${__dirname}/.env`.replace('/dist', '')
    : `${__dirname}/.env.${process.env.NODE_ENV}`.replace('/dist', '');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
  ],
})
export class CommonModule {}
