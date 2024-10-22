import {
    LoadServicosDbFilter,
    LoadServicosRepository
} from '../../../data/protocols/db/servico/load-servicos-repository';
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
import { DeleteServicoRepository } from '../../../data/protocols/db/servico/delete-servico-repository';
import { Filter } from '../../../main/protocols/filter';

export class ServicoPgRepository
    implements LoadServicosRepository, SaveServicoRepository, UpdateServicoRepository, DeleteServicoRepository
{
    async load(filters?: Filter<LoadServicosDbFilter>): Promise<Wrapper<DbServicoModel[]>> {
        let query: any;
        if (filters?.params) {
            query = knexInstance('servico')
                .select(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id'])
                .whereNull('dh_exclusion');
            if (filters.params.startDate) query.andWhere('data', '>=', filters.params.startDate);
            if (filters.params.endDate) query.andWhere('data', '<=', filters.params.endDate);
            if (filters.params.clientes) {
                const carroQuery = knexInstance('cliente_carro')
                    .whereIn('cliente_id', filters?.params?.clientes)
                    .whereNull('dh_exclusion')
                    .returning('carro_id');
                query.andWhere('carro_id', 'in', carroQuery);
            }
            if (filters.params.cliente) {
                const clienteQuery = knexInstance('cliente')
                    .rightJoin('cliente_carro', 'cliente_id', '=', 'id_cliente')
                    .andWhereILike('nome', `%${filters.params.cliente}%`)
                    .select('cliente_carro.carro_id as carro_id');
                query.andWhere('carro_id', 'in', clienteQuery);
            }
            if (filters.params.placa) {
                const carroQuery = knexInstance('carro')
                    .rightJoin('cliente_carro', 'id_carro', '=', 'carro_id')
                    .andWhereILike('placa', `%${filters.params.placa}%`)
                    .select('id_carro');
                query.andWhere('carro_id', 'in', carroQuery);
            }
            if (filters.params.modelo) {
                const carroQuery = knexInstance('carro')
                    .rightJoin('cliente_carro', 'id_carro', '=', 'carro_id')
                    .andWhereILike('modelo', `%${filters.params.modelo}%`)
                    .select('id_carro');
                query.andWhere('carro_id', 'in', carroQuery);
            }
        } else {
            query = knexInstance('servico')
                .select(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id'])
                .whereNull('dh_exclusion');
        }
        query.orderBy('data', 'desc');
        return await knexPaginateAdapter(query, filters?.pageFilter);
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
            .update({ ...model, last_updated: new Date() })
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(updated);
    }

    async delete(id: number): Promise<void> {
        await knexInstance('servico').where({ id_servico: id }).update({ dh_exclusion: new Date() });
    }
}
