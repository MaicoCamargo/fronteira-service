import { DbClienteModel } from '../../../models/db-cliente-model';

export type AddClienteParams = Omit<DbClienteModel, 'id_cliente'>;

export interface AddClienteRepository {
    add: (cliente: AddClienteParams) => Promise<DbClienteModel>;
}
