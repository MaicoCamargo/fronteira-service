import * as dotenv from 'dotenv';
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
        DEBUG: process.env.DB_POSTGRES_DEBUG !== 'false' || false
    },
    AUTH_SERVICE_HOST: process.env.AUTH_SERVICE_HOST || 'http://127.0.0.1:8005',
    BILLING_SERVICE_HOST: process.env.BILLING_SERVICE_HOST || 'http://127.0.0.1:8080'
};
