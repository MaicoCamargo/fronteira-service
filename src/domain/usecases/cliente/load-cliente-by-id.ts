import { ClienteModel } from '../../models/cliente-model';

export interface LoadClienteById {
    loadById: (id: number) => Promise<ClienteModel>;
}
