import { DbIncludedItemModel } from '../../../../models/db-included-itens-model';

export interface LoadIncludedItensRepository {
    loadIncludedItens: (servicoId: number) => Promise<DbIncludedItemModel[]>;
}
