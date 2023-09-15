import { DbItemModel } from '../../../models/db-item-model';

export interface LoadItensRepository {
    load: () => Promise<DbItemModel>;
}
