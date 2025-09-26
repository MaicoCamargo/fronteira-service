import { DbProfileModel } from '@/data/models/db-profile-model';

export interface LoadProfileByUsernameRepository {
    loadByUsername: (username: string) => Promise<DbProfileModel>;
}
