import { Injectable } from '@nestjs/common';
import { type Store } from 'keyv';
import { getRandomInt } from '@libs/common';

@Injectable()
export class CacheService {
  constructor(private readonly cacheManager: Store<any>) {}

  async get(key: string): Promise<unknown | undefined> {
    return this.cacheManager.get(key);
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl ? (ttl + getRandomInt(20, 60)) * 1000 : undefined);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.delete(key);
  }
}
