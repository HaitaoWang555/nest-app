import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { setupSwagger } from './swagger';
import { AllExceptionsFilter } from './exceptions';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RequestIdMiddleware } from '../middlewares/request-id.middleware';

export async function commonBootstrap(module: any) {
  const app = await NestFactory.create(module, { bufferLogs: true, abortOnError: false });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(helmet());
  // 中间件
  app.use(RequestIdMiddleware);
  // Logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // swagger
  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    setupSwagger(app, { title: process.env.SWAGGER_TITLE });
  }
  app.use(bodyParser.json({ limit: process.env.MAX_BODY_SIZE }));
  app.use(bodyParser.urlencoded({ limit: process.env.MAX_BODY_SIZE, extended: true }));
  // app.exceptions
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  // validator @Allow()
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(Number(process.env.PORT) || 3000);
}
