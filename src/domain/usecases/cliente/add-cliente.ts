import { ClienteModel } from '../../models/cliente-model';

export type AddClienteParams = Omit<ClienteModel, 'id' | 'lastUpdated'>;

export interface AddCliente {
    add: (params: AddClienteParams) => Promise<ClienteModel>;
}
