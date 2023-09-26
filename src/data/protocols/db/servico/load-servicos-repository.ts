import { DbServicoModel } from '../../../models/db-servico-model';
import { Wrapper } from '../../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../../main/protocols/page-filter';

export interface LoadServicosRepository {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<DbServicoModel[]>>;
}
