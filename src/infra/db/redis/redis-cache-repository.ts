import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';
import { DeleteCacheRepository } from '@/data/protocols/cache/delete-cache-repository';
import { RedisHelper } from './helpers/redis-helper';

export class RedisCacheRepository implements GetCacheRepository, SetCacheRepository, DeleteCacheRepository {
    async set(key: string, value: any, ttl?: number): Promise<void> {
        const client = RedisHelper.getClient();
        const serialized = JSON.stringify(value);

        if (ttl) {
            await client.setEx(key, ttl, serialized);
        } else {
            await client.set(key, serialized);
        }
    }

    async get<T = any>(key: string): Promise<T | null> {
        const client = RedisHelper.getClient();
        const value = await client.get(key);

        if (!value) {
            return null;
        }

        try {
            /* @fixme remover try catch */
            return JSON.parse(value) as T;
        } catch {
            return value as T;
        }
    }

    async delete(key: string): Promise<void> {
        const client = RedisHelper.getClient();
        await client.del(key);
    }
}
