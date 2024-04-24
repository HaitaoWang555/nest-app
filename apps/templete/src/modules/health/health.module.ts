import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './redis-health.provider';

@Module({
  imports: [TerminusModule],
  providers: [RedisHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
