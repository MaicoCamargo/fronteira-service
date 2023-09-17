import { DbItemModel } from '../../../models/db-item-model';

export type SaveItemModel = Omit<DbItemModel, 'id_peca'>;

export interface SaveItemRepository {
    save: (item: SaveItemModel) => Promise<DbItemModel>;
}
