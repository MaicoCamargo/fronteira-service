import { ItemModel } from '../../models/item-model';

export type AddItemParams = Omit<ItemModel, 'id'>;

export interface AddItem {
    add: (item: AddItemParams) => Promise<ItemModel>;
}
