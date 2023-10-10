import { LoadServicosRepository } from '../../../data/protocols/db/servico/load-servicos-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { knexInstance } from './helpers/knex-helper';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { SaveServicoModel, SaveServicoRepository } from '../../../data/protocols/db/servico/save-servico-repository';
import { mapper } from './helpers/mapper';
import {
    UpdateServicoModel,
    UpdateServicoRepository
} from '../../../data/protocols/db/servico/update-servico-repository';

export class ServicoPgRepository implements LoadServicosRepository, SaveServicoRepository, UpdateServicoRepository {
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
            .insert({ ...model, data: new Date() })
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(saved);
    }

    async update(model: UpdateServicoModel): Promise<DbServicoModel> {
        const updated = await knexInstance('servico')
            .where({ id_servico: model.id_servico })
            .update(model)
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(updated);
    }
}
