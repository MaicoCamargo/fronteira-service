import { ProfileModel } from '@/domain/models/profile-model';

export interface LoadProfileByMail {
    load: (mail: string) => Promise<ProfileModel>;
}
