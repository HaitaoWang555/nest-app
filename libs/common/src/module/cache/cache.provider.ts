import KeyvRedis from '@keyv/redis';
import type { Provider } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as Keyv from 'keyv';

import { CacheService } from './cache.service';

export const CacheProvider: Provider = {
  provide: CacheService,
  // inject: [{ token: 'CacheInjectKey', optional: true }],
  useFactory: async () => {
    const logger = new Logger('CacheProvider');
    const provider = process.env.BACKEND_CACHE_PROVIDER || 'memory';
    const redis = `redis://${process.env.REDIS_HOST}:${Number(process.env.REDIS_PORT)}`;

    logger.log(`Cache Manager Adapter: ${provider}`);

    let store;

    switch (provider) {
      case 'memory':
        store = new Map();
        break;
      case 'redis':
        store = new KeyvRedis(redis, { useRedisSets: false });
        break;

      default:
        break;
    }

    const keyv = new Keyv({ namespace: `${process.env.APP_NAME || 'App'}_cache`, store: store });
    keyv.on('error', (error) => {
      error && logger.error(error, 'Cache Manager Connection Error');
    });

    logger.log(`Cache Manager Namespace: ${keyv.opts.namespace}`);
    return new CacheService(keyv);
  },
};
