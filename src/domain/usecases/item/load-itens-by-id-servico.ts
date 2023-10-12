import { ItemModel } from '../../models/item-model';

export interface LoadItensByIdServico {
    load: (idServico: number) => Promise<ItemModel[]>;
}
