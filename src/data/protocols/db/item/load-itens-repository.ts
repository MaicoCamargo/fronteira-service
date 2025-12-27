import { DbItemModel } from '@/data/models/db-item-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { Filter } from '@/main/protocols/filter';

export interface DbItemsDbFilter {
    label?: string;
}

export interface LoadItensRepository {
    load: (filter?: Filter<DbItemsDbFilter>) => Promise<Wrapper<DbItemModel[]>>;
}
