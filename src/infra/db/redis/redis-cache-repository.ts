import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';
import { DeleteCacheRepository } from '@/data/protocols/cache/delete-cache-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';
import { RedisHelper } from './helpers/redis-helper';
import { httpRequestScope } from '@/infra/http/http-request-scope';
import { GUEST_CLIENT_ID } from '@/main/config/env';

export class RedisCacheRepository
    implements GetCacheRepository, SetCacheRepository, DeleteCacheRepository, ScanAndDeleteCacheRepository
{
    async set<T = any>(key: string, value: T, ttl?: number): Promise<void> {
        if (httpRequestScope.getStore()?.clientId === GUEST_CLIENT_ID) {
            return;
        }
        const client = await RedisHelper.getClient();
        const serialized = JSON.stringify(value);
        const keyWithTenant = this.generateKey(key);
        if (ttl) {
            await client.setEx(keyWithTenant, ttl, serialized);
        } else {
            await client.set(keyWithTenant, serialized);
        }
    }

    async get<T = any>(key: string): Promise<T | null> {
        const client = await RedisHelper.getClient();
        const value = await client.get(this.generateKey(key));

        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value) as T;
        } catch {
            return value as T;
        }
    }

    async delete(key: string): Promise<void> {
        const client = await RedisHelper.getClient();
        await client.del(this.generateKey(key));
    }

    async scanAndDelete(key: string): Promise<void> {
        const client = await RedisHelper.getClient();
        const pattern = `${this.generateKey(key)}*`;
        let cursor = 0;
        do {
            const found = await client.scan(cursor, { MATCH: pattern });
            cursor = found.cursor;
            for (const foundKey of found.keys) {
                await client.del(foundKey);
            }
        } while (cursor !== 0);
    }

    private generateKey(key: string): string {
        const clientId = httpRequestScope.getStore()?.clientId;
        return `${!clientId ? 'public' : `${clientId}`}::${key}`;
    }
}
