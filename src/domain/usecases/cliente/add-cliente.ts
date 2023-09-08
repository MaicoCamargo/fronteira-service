import { ClienteModel } from '../../models/cliente-model';

export type AddClienteParams = Omit<ClienteModel, 'id' | 'lastUpdated' | 'carro' | 'endereco'>;

export interface AddCliente {
    add: (params: AddClienteParams) => Promise<ClienteModel>;
}
