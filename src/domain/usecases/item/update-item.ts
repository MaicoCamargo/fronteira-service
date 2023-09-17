import { ItemModel } from '../../models/item-model';

export interface UpdateItem {
    update: (item: ItemModel) => Promise<ItemModel>;
}
