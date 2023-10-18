import { DbIncludedItemModel } from '../../../../models/db-included-item-model';
import { SaveIncludedItemModel } from './save-included-itens-repository';

export type UpdateIncludedItemModel = Required<SaveIncludedItemModel>;

export interface UpdateIncludedItemRepository {
    update: (model: UpdateIncludedItemModel) => Promise<DbIncludedItemModel>;
}
