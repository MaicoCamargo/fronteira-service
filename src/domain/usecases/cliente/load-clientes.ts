import { ClienteModel } from '../../models/cliente-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';

export interface LoadClientes {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<ClienteModel[]>>;
}
