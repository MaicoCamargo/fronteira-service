import { DbProfileModel } from '@/data/models/db-profile-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { Filter } from '@/main/protocols/filter';

export interface LoadProfileDbFilter {
    firstName?: string;
    lastName?: string;
    nickname?: string;
}

export interface LoadProfilesRepository {
    load: (filters: Filter<LoadProfileDbFilter>) => Promise<Wrapper<DbProfileModel[]>>;
}
