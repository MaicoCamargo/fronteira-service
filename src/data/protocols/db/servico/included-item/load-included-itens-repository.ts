import { DbIncludedItemModel } from '../../../../models/db-included-item-model';

export interface LoadIncludedItensRepository {
    loadIncludedItens: (servicoId: number) => Promise<DbIncludedItemModel[]>;
}
