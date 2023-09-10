import { ClienteModel } from '../../models/cliente-model';
import { Wrapper } from '../../../main/adapters/knex-paginate-adapter';

export interface LoadClientes {
    load: () => Promise<Wrapper<ClienteModel[]>>;
}
