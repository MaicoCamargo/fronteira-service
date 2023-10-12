import { DbIncludedItemModel } from '../../../../models/db-included-item-model';

export interface LoadIncludedItensRepository {
    load: (servicoId: number) => Promise<DbIncludedItemModel[]>;
}
