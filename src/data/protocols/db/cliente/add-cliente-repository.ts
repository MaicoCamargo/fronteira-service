import { DbClienteModel } from '../../../models/db-cliente-model';

export type AddClienteModel = Omit<DbClienteModel, 'id_cliente'>;

export interface AddClienteRepository {
    save: (cliente: AddClienteModel) => Promise<DbClienteModel>;
}
