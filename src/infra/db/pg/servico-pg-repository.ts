import { LoadServicosRepository } from '../../../data/protocols/db/servico/load-servicos-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { knexInstance } from './helpers/knex-helper';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { SaveServicoModel, SaveServicoRepository } from '../../../data/protocols/db/servico/save-servico-repository';
import { mapper } from './helpers/mapper';

export class ServicoPgRepository implements LoadServicosRepository, SaveServicoRepository {
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

    async save(model: SaveServicoModel): Promise<DbServicoModel> {
        const saved = await knexInstance('servico')
            .insert(model)
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(saved);
    }
}
