import { LoadServicosDbFilter, LoadServicosRepository } from '@/data/protocols/db/servico/load-servicos-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbServicoModel } from '@/data/models/db-servico-model';
import { KnexHelper } from './helpers/knex-helper';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { SaveServicoModel, SaveServicoRepository } from '@/data/protocols/db/servico/save-servico-repository';
import { mapper } from './helpers/mapper';
import { UpdateServicoModel, UpdateServicoRepository } from '@/data/protocols/db/servico/update-servico-repository';
import { DeleteServicoRepository } from '@/data/protocols/db/servico/delete-servico-repository';
import { Filter } from '@/main/protocols/filter';
import { LoadOrderByIdRepository } from '@/data/protocols/db/servico/load-order-by-id-repository';

export class ServicoPgRepository
    implements
        LoadServicosRepository,
        SaveServicoRepository,
        UpdateServicoRepository,
        DeleteServicoRepository,
        LoadOrderByIdRepository
{
    async load(filters?: Filter<LoadServicosDbFilter>): Promise<Wrapper<DbServicoModel[]>> {
        let query: any;
        if (filters?.params) {
            query = KnexHelper.forTenant()
                .table('servico')
                .select([
                    'id_servico',
                    'valor',
                    'descricao',
                    'data',
                    'quilometragem',
                    'last_updated',
                    'carro_id',
                    'codigo'
                ])
                .whereNull('dh_exclusion');
            if (filters.params.startDate) {
                const startDate = new Date(filters.params.startDate);
                const startOfDay = new Date(startDate.setHours(0, 0, 0));
                query.andWhere('data', '>=', startOfDay);
            }
            if (filters.params.endDate) {
                const endDate = new Date(filters.params.endDate);
                const endOfDay = new Date(endDate.setHours(23, 59, 59));
                query.andWhere('data', '<=', endOfDay);
            }
            if (filters.params.clientes) {
                const carroQuery = await KnexHelper.forTenant()
                    .table('cliente_carro')
                    .whereIn('cliente_id', filters?.params?.clientes)
                    .whereNull('dh_exclusion')
                    .returning('carro_id');
                query.andWhere('carro_id', 'in', carroQuery);
            }
            if (filters.params.cliente) {
                const clienteQuery = await KnexHelper.forTenant()
                    .table('cliente')
                    .rightJoin('cliente_carro', 'cliente_id', '=', 'id_cliente')
                    .andWhereILike('nome', `%${filters.params.cliente}%`)
                    .select('cliente_carro.carro_id as carro_id');
                query.andWhere('carro_id', 'in', clienteQuery);
            }
            if (filters.params.placa) {
                const carroQuery = await KnexHelper.forTenant()
                    .table('carro')
                    .rightJoin('cliente_carro', 'id_carro', '=', 'carro_id')
                    .andWhereILike('placa', `%${filters.params.placa}%`)
                    .select('id_carro');
                query.andWhere('carro_id', 'in', carroQuery);
            }
            if (filters.params.modelo) {
                const carroQuery = await KnexHelper.forTenant()
                    .table('carro')
                    .rightJoin('cliente_carro', 'id_carro', '=', 'carro_id')
                    .andWhereILike('modelo', `%${filters.params.modelo}%`)
                    .select('id_carro');
                query.andWhere('carro_id', 'in', carroQuery);
            }
            if (filters.params.code) {
                query.andWhere({ codigo: filters.params.code });
            }
        } else {
            query = KnexHelper.forTenant()
                .table('servico')
                .select([
                    'id_servico',
                    'valor',
                    'descricao',
                    'data',
                    'quilometragem',
                    'last_updated',
                    'carro_id',
                    'codigo'
                ])
                .whereNull('dh_exclusion');
        }
        query.orderBy('data', 'desc');
        return await knexPaginateAdapter(query, filters?.pageFilter);
    }

    async save(model: SaveServicoModel): Promise<DbServicoModel> {
        const { code, ...modelWithoutCode } = model;
        const saved = await KnexHelper.forTenant()
            .table('servico')
            .insert({ ...modelWithoutCode, codigo: code, data: new Date() })
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(saved);
    }

    async update(model: UpdateServicoModel): Promise<DbServicoModel> {
        const updated = await KnexHelper.forTenant()
            .table('servico')
            .where({ id_servico: model.id_servico })
            .update({ ...model, last_updated: new Date() })
            .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
        return mapper(updated);
    }

    async delete(id: number): Promise<void> {
        await KnexHelper.forTenant().table('servico').where({ id_servico: id }).update({ dh_exclusion: new Date() });
    }

    async loadById(id_servico: number): Promise<DbServicoModel> {
        const query = await KnexHelper.forTenant()
            .table('servico')
            .select(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id', 'codigo'])
            .where({ id_servico });
        return mapper(query);
    }
}
