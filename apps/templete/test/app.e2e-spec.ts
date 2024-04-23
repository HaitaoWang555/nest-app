import { join } from 'path';
process.env.TEST_ROOT_DIR = join(__dirname, '../');
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Redis } from 'ioredis';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';

// 将多个相关的测试组合在一起
describe('app (e2e)', () => {
  let app: INestApplication;
  let redis: Redis;

  // 文件内每个测试开始前执行的钩子函数
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    redis = app.get<Redis>(getRedisConnectionToken());
  });

  // 文件内所有测试完成后执行的钩子函数
  afterAll(async () => {
    await app.close();
    redis.disconnect();
  });

  it('should App Status OK', async () => {
    const res = await request(app.getHttpServer()).get('/poetry/query?pageNum=1&pageSize=10');

    expect(HttpStatus.OK).toBe(res.status);
  });
});
