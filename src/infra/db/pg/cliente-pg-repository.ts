import { LoadClientesRepository } from '../../../data/protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';

export class ClientePgRepository implements LoadClientesRepository {
    async load(): Promise<DbClienteModel[]> {
        return await knexInstance('cliente');
    }

    async save(model: DbClienteModel): Promise<DbClienteModel> {
        const result: any = await knexInstance('cliente').insert(model).returning('*');
        const map = mapper(result);
        return {
            id_cliente: map.id_cliente,
            cpf: map.cpf,
            nome: map.nome,
            telefone: map.telefone,
            last_updated: new Date(),
            carro_id: map.carro_id,
            endereco_id: map.endereco_id
        };
    }
}
