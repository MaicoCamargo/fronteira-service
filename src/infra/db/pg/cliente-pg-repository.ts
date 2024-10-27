import { LoadClientesDbFilter, LoadClientesRepository } from '@/data/protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '@/data/models/db-cliente-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import { LoadClienteByIdRepository } from '@/data/protocols/db/cliente/load-cliente-by-id-repository';
import { UpdateClienteModel, UpdateClienteRepository } from '@/data/protocols/db/cliente/update-cliente-repository';
import { DeleteClienteRepository } from '@/data/protocols/db/cliente/delete-cliente-repository';
import { AddClienteModel, SaveClienteRepository } from '@/data/protocols/db/cliente/save-cliente-repository';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { LoadClienteByIdServicoRepository } from '@/data/protocols/db/cliente/load-cliente-by-id-servico-repository';
import { Filter } from '@/main/protocols/filter';

export class ClientePgRepository
    implements
        LoadClientesRepository,
        LoadClienteByIdRepository,
        UpdateClienteRepository,
        DeleteClienteRepository,
        SaveClienteRepository,
        LoadClienteByIdServicoRepository
{
    async load(filters?: Filter<LoadClientesDbFilter>): Promise<Wrapper<DbClienteModel[]>> {
        let query: any;
        if (filters?.params) {
            query = knexInstance('cliente').whereNull('dh_exclusion');
            if (filters.params.nome) {
                query.andWhereILike('nome', `%${filters.params.nome}%`);
            }
        } else {
            query = knexInstance('cliente').whereNull('dh_exclusion');
        }
        query.orderBy('nome');
        return await knexPaginateAdapter(query, filters?.pageFilter);
    }

    async save(model: AddClienteModel): Promise<DbClienteModel> {
        const result: any = await knexInstance('cliente').insert(model).returning('*');
        const map = mapper(result);
        return {
            id_cliente: map.id_cliente,
            cpf: map.cpf,
            nome: map.nome,
            telefone: map.telefone,
            last_updated: map.last_updated,
            endereco_id: map.endereco_id
        };
    }

    async loadById(id: number): Promise<DbClienteModel> {
        const result: any = await knexInstance('cliente').where({ id_cliente: id }).whereNull('dh_exclusion');
        if (result.length === 0) return null;
        const map = mapper(result);
        return {
            id_cliente: map.id_cliente,
            cpf: map.cpf,
            nome: map.nome,
            telefone: map.telefone,
            last_updated: map.last_updated,
            endereco_id: map.endereco_id
        };
    }

    async update(model: UpdateClienteModel): Promise<DbClienteModel> {
        const result: any = await knexInstance('cliente')
            .where({ id_cliente: model.id_cliente })
            .update({ last_updated: new Date(), cpf: model.cpf, nome: model.nome, telefone: model.telefone })
            .returning(['id_cliente', 'cpf', 'nome', 'telefone', 'endereco_id']);
        return mapper(result);
    }

    async delete(id: number): Promise<void> {
        await knexInstance('cliente').where({ id_cliente: id }).update({ dh_exclusion: new Date() });
    }

    async loadByIdServico(servicoId: number): Promise<DbClienteModel> {
        const result = await knexInstance('servico')
            .leftJoin('cliente_carro', 'servico.carro_id', 'cliente_carro.carro_id')
            .leftJoin('cliente', 'cliente.id_cliente', 'cliente_carro.cliente_id')
            .where({ id_servico: servicoId })
            .select('cliente.*');
        return mapper(result);
    }
}
