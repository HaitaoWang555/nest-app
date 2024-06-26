import { applyDecorators, INestApplication, Type } from '@nestjs/common';
import { ApiOkResponse, DocumentBuilder, getSchemaPath, SwaggerModule } from '@nestjs/swagger';
import { PageInfo } from '../api/common-page';
import { CommonResult } from '../api/common-result';
import { AUTHORIZATION_PREFIX } from './consts';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

export async function setupSwagger(
  app: INestApplication,
  configParams: {
    title?: string;
    description?: string;
    version?: string;
    path?: string;
  } = {},
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(configParams.title || 'The nest title')
    .setDescription(configParams.description || 'The nest API description')
    .setVersion(configParams.version || '1.0')
    .addSecurity(AUTHORIZATION_PREFIX, {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements(AUTHORIZATION_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [CommonResult, PageInfo],
  });
  SwaggerModule.setup(configParams.path || 'docs', app, document);
  app
    .get(WINSTON_MODULE_NEST_PROVIDER)
    .log(`Swagger Doc: http://localhost:${process.env.PORT}/${configParams.path || 'docs'}`, 'SetupSwagger');
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageInfo) },
          {
            properties: {
              list: { type: 'array', items: { $ref: getSchemaPath(model) } },
            },
          },
        ],
      },
    }),
  );
};
