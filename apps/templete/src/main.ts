import { AppModule } from './app.module';

import { commonBootstrap } from '@libs/common';

async function bootstrap() {
  commonBootstrap(AppModule);
}
bootstrap();
