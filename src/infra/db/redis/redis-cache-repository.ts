import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';
import { DeleteCacheRepository } from '@/data/protocols/cache/delete-cache-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';
import { RedisHelper } from './helpers/redis-helper';
import { httpRequestScope } from '@/infra/http/http-request-scope';

export class RedisCacheRepository
    implements GetCacheRepository, SetCacheRepository, DeleteCacheRepository, ScanAndDeleteCacheRepository
{
    async set(key: string, value: any, ttl?: number): Promise<void> {
        const client = RedisHelper.getClient();
        const serialized = JSON.stringify(value);
        const keyWithTenant = this.generateKey(key);
        if (ttl) {
            await client.setEx(keyWithTenant, ttl, serialized);
        } else {
            await client.set(keyWithTenant, serialized);
        }
    }

    async get<T = any>(key: string): Promise<T | null> {
        const client = RedisHelper.getClient();
        const value = await client.get(this.generateKey(key));

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
        await client.del(this.generateKey(key));
    }

    async scanAndDelete(key: string): Promise<void> {
        const client = RedisHelper.getClient();
        const found = await client.scan(0, { MATCH: `${this.generateKey(key)}*` });
        for (const key of found.keys) {
            await client.del(key);
        }
    }

    private generateKey(key: string): string {
        const clientId = httpRequestScope.getStore()?.clientId;
        return `${!clientId ? 'public' : `${clientId}`}::${key}`;
    }
}
