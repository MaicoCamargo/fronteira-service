import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeRedisCacheRepository = (): RedisCacheRepository => {
    return new RedisCacheRepository();
};
