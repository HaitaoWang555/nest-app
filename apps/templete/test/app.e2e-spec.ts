import { join } from 'path';
process.env.TEST_ROOT_DIR = join(__dirname, '../');
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Redis } from 'ioredis';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import { CommonResult, ResultCode } from '@libs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { DataSource } from 'typeorm';

// 将多个相关的测试组合在一起
describe('app (e2e)', () => {
  let app: INestApplication;
  let redis: Redis;
  let dataSource: DataSource;

  // 文件内每个测试开始前执行的钩子函数
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    redis = app.get<Redis>(getRedisConnectionToken());
    dataSource = app.get<DataSource>(DataSource);
  });

  // 文件内所有测试完成后执行的钩子函数
  afterAll(async () => {
    await dataSource?.destroy();
    await app.close();
    redis?.disconnect();
  });

  it('should App Status OK', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    const data: CommonResult<HealthCheckResult> = res.body;
    // http status
    expect(HttpStatus.OK).toBe(res.status);
    // custom code
    expect(ResultCode.SUCCESS).toBe(data.code);
    expect('ok').toBe(data.data.status);
  });
});
