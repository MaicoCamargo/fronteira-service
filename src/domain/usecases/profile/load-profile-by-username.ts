import { ProfileModel } from '@/domain/models/profile-model';

export interface LoadProfileByUsername {
    load: (username: string) => Promise<ProfileModel>;
}
