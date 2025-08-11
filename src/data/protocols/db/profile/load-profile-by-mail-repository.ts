import { DbProfileModel } from '@/data/models/db-profile-model';

export interface LoadProfileByMailRepository {
    loadByMail: (mail: string) => Promise<DbProfileModel>;
}
