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
        if (this.client && this.isConnected) {
            await this.client.quit();
            this.client = null;
        }
    },

    getClient(): RedisClientType {
        if (!this.client) {
            console.warn('Redis Client Client Not Found, trying to get client');
            this.connect();
        }
        return this.client;
    }
};
