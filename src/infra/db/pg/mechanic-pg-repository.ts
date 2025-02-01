import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { PageFilter } from '@/main/protocols/page-filter';

export class MechanicPgRepository implements LoadMechanicsRepository {
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbMechanicModel[]>> {
        const queryBuilder = knexInstance('mecanico').returning('*');
        return await knexPaginateAdapter(queryBuilder, pageFilter);
    }
}
