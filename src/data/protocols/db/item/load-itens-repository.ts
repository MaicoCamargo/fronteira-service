import { DbItemModel } from '../../../models/db-item-model';
import { Wrapper } from '../../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../../main/protocols/page-filter';

export interface LoadItensRepository {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<DbItemModel[]>>;
}
