import * as dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'test',
    MONGO_URL:
        process.env.MONGO_URL ||
        'mongodb+srv://fronteira-db-user:JcNXRpY8ywi3TJgn@fronteira-db.0fq1r.mongodb.net/?retryWrites=true&w=majority',
    PORT: process.env.PORT || 5050,
    DB_POSTGRES: {
        HOST: process.env.DB_POSTGRES_HOST || '127.0.0.1',
        PORT: process.env.DB_POSTGRES_PORT || 5432,
        USER: process.env.DB_POSTGRES_USER || 'postgres',
        PASSWORD: process.env.DB_POSTGRES_PASSWORD,
        DATABASE: process.env.DB_POSTGRES_DATABASE || 'fronteira'
    }
};
