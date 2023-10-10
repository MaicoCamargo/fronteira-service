import { DbIncludedItemModel } from '../../../../models/db-included-item-model';

export type SaveIncludedItemModel = Omit<
    DbIncludedItemModel,
    'id_servico_peca' | 'created_at' | 'last_updated' | 'marca' | 'nome'
>;

export interface SaveIncludedItensRepository {
    save: (itens: SaveIncludedItemModel[]) => Promise<DbIncludedItemModel[]>;
}
