import { RedisCacheRepository } from './redis-cache-repository';
import { RedisHelper } from './helpers/redis-helper';

describe('RedisCacheRepository', () => {
    beforeAll(async () => {
        await RedisHelper.connect();
        const client = RedisHelper.getClient();
        await client.flushDb();
    });

    afterAll(async () => {
        await RedisHelper.disconnect();
    });

    describe('set()', () => {
        test('Should store a value in Redis', async () => {
            const sut = new RedisCacheRepository();
            const key = 'test:key';
            const value = { name: 'Test', id: 1 };

            await sut.set(key, value);

            const client = RedisHelper.getClient();
            const stored = await client.get(key);
            expect(stored).toBe(JSON.stringify(value));
        });

        test('Should store a value with TTL', async () => {
            const sut = new RedisCacheRepository();
            const key = 'test:key:ttl';
            const value = { name: 'Test TTL' };
            const ttl = 10;

            await sut.set(key, value, ttl);

            const client = RedisHelper.getClient();
            const storedTtl = await client.ttl(key);
            expect(storedTtl).toBeGreaterThan(0);
            expect(storedTtl).toBeLessThanOrEqual(ttl);
        });
    });

    describe('get()', () => {
        test('Should retrieve a value from Redis', async () => {
            const sut = new RedisCacheRepository();
            const key = 'test:get';
            const value = { name: 'Get Test', id: 2 };

            await sut.set(key, value);
            const result = await sut.get(key);

            expect(result).toEqual(value);
        });

        test('Should return null if key does not exist', async () => {
            const sut = new RedisCacheRepository();
            const result = await sut.get('non:existent:key');

            expect(result).toBeNull();
        });

        test('Should handle string values', async () => {
            const sut = new RedisCacheRepository();
            const key = 'test:string';
            const value = 'simple string';

            const client = RedisHelper.getClient();
            await client.set(key, value);

            const result = await sut.get(key);
            expect(result).toBe(value);
        });
    });

    describe('delete()', () => {
        test('Should delete a key from Redis', async () => {
            const sut = new RedisCacheRepository();
            const key = 'test:delete';
            const value = { name: 'Delete Test' };

            await sut.set(key, value);
            await sut.delete(key);

            const result = await sut.get(key);
            expect(result).toBeNull();
        });
    });
});
