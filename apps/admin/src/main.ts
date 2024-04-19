import { AdminModule } from './admin.module';
import { commonBootstrap } from '@libs/common';

async function bootstrap() {
  commonBootstrap(AdminModule);
}
bootstrap();
