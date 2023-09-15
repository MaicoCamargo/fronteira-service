import { ItemModel } from '../../models/item-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';

export interface LoadItens {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<ItemModel[]>>;
}
