import { DbItemModel } from '../../../models/db-item-model';

export type DbUpdateItemModel = Omit<DbItemModel, 'created_at'>;

export interface UpdateItemRepository {
    update: (item: DbUpdateItemModel) => Promise<DbItemModel>;
}
