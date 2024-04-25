import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { RedisHealthIndicator } from './redis-health.provider';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    private redis: RedisHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    let res: HealthCheckResult;
    try {
      res = await this.health.check([
        async () => this.redis.isHealthy('redis'),
        async () => this.db.pingCheck('database', { timeout: 300 }),
      ]);
    } catch (error) {
      res = error.response;
      this.logger.error('Health Check ERROR', error.stack);
    }

    return res;
  }
}
