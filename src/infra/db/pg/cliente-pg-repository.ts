import { LoadClientesRepository } from '../../../data/protocols/db/cliente/load-clientes-repository';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { knexInstance } from './helpers/knex-helper';

export class ClientePgRepository implements LoadClientesRepository {
    async load(): Promise<DbClienteModel[]> {
        return await knexInstance('cliente');
    }
}
