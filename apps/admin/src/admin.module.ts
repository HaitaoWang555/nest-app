import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AppInterceptor } from './app.interceptor';
import { CommonModule } from '@libs/common';

@Module({
  imports: [CommonModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AdminModule {}
