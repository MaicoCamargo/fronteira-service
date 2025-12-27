import { ItemModel } from '@/domain/models/item-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadItemsParams extends PageFilter {
    label?: string;
}

export interface LoadItens {
    load: (params?: LoadItemsParams) => Promise<Wrapper<ItemModel[]>>;
}
