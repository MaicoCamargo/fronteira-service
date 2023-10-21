import { knex } from 'knex';
import { ENV } from '../../../../main/config/env';
import { attachPaginate } from 'knex-paginate';

const connection = {
    host: ENV.DB_POSTGRES.HOST,
    port: ENV.DB_POSTGRES.PORT,
    user: ENV.DB_POSTGRES.USER,
    password: ENV.DB_POSTGRES.PASSWORD,
    database: ENV.DB_POSTGRES.DATABASE
};

attachPaginate();
export const knexInstance = knex({
    client: 'pg',
    connection,
    debug: ENV.DB_POSTGRES.DEBUG
});
