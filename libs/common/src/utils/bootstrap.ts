import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { setupSwagger } from './swagger';
import { AllExceptionsFilter } from './exceptions';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export function commonBootstrap(app: INestApplication<any>) {
  // Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // swagger
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    setupSwagger(app, { title: '代码生成项目API文档' });
  }
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  // app.exceptions
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  // validator @Allow()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
}
