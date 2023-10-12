import { LoadClientesRepository } from '../../../data/protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import { LoadClienteByIdRepository } from '../../../data/protocols/db/cliente/load-cliente-by-id-repository';
import {
    UpdateClienteModel,
    UpdateClienteRepository
} from '../../../data/protocols/db/cliente/update-cliente-repository';
import { DeleteClienteRepository } from '../../../data/protocols/db/cliente/delete-cliente-repository';
import { AddClienteModel, SaveClienteRepository } from '../../../data/protocols/db/cliente/save-cliente-repository';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';
import { LoadClienteByIdServicoRepository } from '../../../data/protocols/db/cliente/load-cliente-by-id-servico-repository';

export class ClientePgRepository
    implements
        LoadClientesRepository,
        LoadClienteByIdRepository,
        UpdateClienteRepository,
        DeleteClienteRepository,
        SaveClienteRepository,
        LoadClienteByIdServicoRepository
{
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbClienteModel[]>> {
        const query = knexInstance('cliente');
        return await knexPaginateAdapter(query, pageFilter);
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
        const result: any = await knexInstance('cliente').where({ id_cliente: id });
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
            .update(model)
            .returning('*');
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

    async delete(id: number): Promise<void> {
        await knexInstance('cliente').where({ id_cliente: id }).del();
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
