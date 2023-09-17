import { LoadServicosRepository } from '../../../data/protocols/db/servico/load-servicos-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { knexInstance } from './helpers/knex-helper';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';

export class ServicoPgRepository implements LoadServicosRepository {
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbServicoModel[]>> {
        const query = knexInstance('servico').select([
            'id_servico',
            'valor',
            'descricao',
            'data',
            'quilometragem',
            'last_updated',
            'carro_id'
        ]);
        return await knexPaginateAdapter(query, pageFilter);
    }
}
