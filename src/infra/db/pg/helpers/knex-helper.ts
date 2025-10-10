import { knex } from 'knex';
import { ENV } from '@/main/config/env';
import { attachPaginate } from 'knex-paginate';
import { httpRequestScope } from '@/infra/http/http-request-scope';

const connection = {
    host: ENV.DB_POSTGRES.HOST,
    port: ENV.DB_POSTGRES.PORT,
    user: ENV.DB_POSTGRES.USER,
    password: ENV.DB_POSTGRES.PASSWORD,
    database: ENV.DB_POSTGRES.DATABASE
};

attachPaginate();

const baseKnex = knex({
    client: 'pg',
    connection,
    debug: ENV.DB_POSTGRES.DEBUG
});

function loadSchema(clientId: string): string {
    const tenant = ENV.TENANTS.find((t) => t.CLIENT_ID === clientId);
    return tenant?.SCHEMA ?? 'public';
}

export const KnexHelper = {
    forTenant: () => {
        const store = httpRequestScope.getStore();
        return baseKnex.withSchema(loadSchema(store?.clientId));
    },

    destroy: async () => {
        await baseKnex.destroy();
    }
};
