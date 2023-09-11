import { DbClienteModel } from '../../../models/db-cliente-model';
import { Wrapper } from '../../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../../main/protocols/page-filter';

export interface LoadClientesRepository {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<DbClienteModel[]>>;
}
