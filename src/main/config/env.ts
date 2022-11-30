export const ENV = {
    MONGO_URL:
        process.env.MONGO_URL ||
        'mongodb+srv://fronteira-db-user:JcNXRpY8ywi3TJgn@fronteira-db.0fq1r.mongodb.net/?retryWrites=true&w=majority',
    PORT: process.env.port || 5050
};
