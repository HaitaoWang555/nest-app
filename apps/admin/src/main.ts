import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { commonBootstrap } from '@libs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  commonBootstrap(app);
  await app.listen(3000);
}
bootstrap();
