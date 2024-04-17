import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as modules from './modules';
import { CommonModule } from '@libs/common';
import { TypeormSqliteModule } from '@libs/typeorm';
import { AppInterceptor } from './app.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, sep } from 'path';

@Module({
  imports: [
    CommonModule,
    TypeormSqliteModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, `assets${sep}dist`),
    }),
    ...Object.values(modules),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
