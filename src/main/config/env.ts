import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'test',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://172.17.0.3:27017/fronteira-test',
    PORT: process.env.PORT || 5050,
    DB_POSTGRES: {
        HOST: process.env.DB_POSTGRES_HOST || '127.0.0.1',
        PORT: process.env.DB_POSTGRES_PORT || 5432,
        USER: process.env.DB_POSTGRES_USER || 'postgres',
        PASSWORD: process.env.DB_POSTGRES_PASSWORD,
        DATABASE: process.env.DB_POSTGRES_DATABASE || 'new_fronteira_test',
        DEBUG: process.env.DB_POSTGRES_DEBUG !== 'false' || false,
        POOL_MIN: process.env.DB_POSTGRES_POOL_MIN || 1,
        POOL_MAX: process.env.DB_POSTGRES_POOL_MAX || 10
    },
    AUTH_SERVICE_HOST: process.env.AUTH_SERVICE_HOST || 'http://127.0.0.1:8005',
    BILLING_SERVICE_HOST: process.env.BILLING_SERVICE_HOST || 'http://127.0.0.1:8080',
    SERVICE: {
        NAME: process.env.SERVICE_NAME || 'fronteira-service',
        ID: process.env.SERVICE_ID || 1
    },
    MECHANIC_POSITION_ID: process.env.MECHANIC_POSITION_ID || 1,
    REDIS: {
        URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        TTL_DEFAULT: Number(process.env.REDIS_TTL_DEFAULT) || 300
    },
    TENANTS: [
        { CLIENT_ID: process.env.CLIENT_ID_NEW_FRONTEIRA, SCHEMA: process.env.SCHEMA_NEW_FRONTEIRA },
        { CLIENT_ID: process.env.CLIENT_ID_CONVENCAO, SCHEMA: process.env.SCHEMA_CONVENCAO }
    ]
};
