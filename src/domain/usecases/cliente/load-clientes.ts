import { ClienteModel } from '../../models/cliente-model';

export interface LoadClientes {
    load: () => Promise<ClienteModel[]>;
}
