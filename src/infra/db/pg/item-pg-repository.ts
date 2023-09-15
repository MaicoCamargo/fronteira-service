import { LoadItensRepository } from '../../../data/protocols/db/item/load-itens-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbItemModel } from '../../../data/models/db-item-model';
import { knexInstance } from './helpers/knex-helper';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';

export class ItemPgRepository implements LoadItensRepository {
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbItemModel[]>> {
        const query = knexInstance('peca').returning(['id_peca', 'marca', 'valor', 'nome']);
        return await knexPaginateAdapter(query, pageFilter);
    }
}
