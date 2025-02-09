import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadMechanicsRepository {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<DbMechanicModel[]>>;
}
