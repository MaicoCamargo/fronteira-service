import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { Filter } from '@/main/protocols/filter';

export interface LoadMechanicDbFilter {
    firstName?: string;
    lastName?: string;
    nickname?: string;
}

export interface LoadMechanicsRepository {
    load: (filter?: Filter<LoadMechanicDbFilter>) => Promise<Wrapper<DbMechanicModel[]>>;
}
