import { AuthModule } from './auth.module';
import { commonBootstrap } from '@libs/common';

async function bootstrap() {
  commonBootstrap(AuthModule);
}
bootstrap();
