import { ItemModel } from '../../models/item-model';

export interface LoadItens {
    load: () => Promise<ItemModel>;
}
