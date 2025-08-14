import { ProfileModel } from '@/domain/models/profile-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadProfilesParams extends PageFilter {
    firstName?: string;
    lastName?: string;
    nickname?: string;
}

export interface LoadProfiles {
    load: (params?: LoadProfilesParams) => Promise<Wrapper<ProfileModel[]>>;
}
