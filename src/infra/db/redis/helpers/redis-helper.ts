import { createClient, RedisClientType } from 'redis';
import { ENV } from '@/main/config/env';

export const RedisHelper = {
    client: null as RedisClientType,

    async connect(): Promise<void> {
        if (this.client?.isOpen) {
            return;
        }

        this.client = createClient({
            url: ENV.REDIS.URL
        });
        await this.client.connect();
    },

    async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.quit();
            this.client = null;
        }
    },

    async getClient(): Promise<RedisClientType> {
        await this.connect();
        return this.client;
    },

    async cleanAll(): Promise<void> {
        await this.connect();
        await this.client.flushDb();
    }
};
