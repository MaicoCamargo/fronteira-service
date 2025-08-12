import { ProfileModel } from '@/domain/models/profile-model';

export type AddProfileParams = Omit<ProfileModel, 'id' | 'createdAt' | 'positions'>;

export interface AddProfile {
    add: (params: AddProfileParams) => Promise<ProfileModel>;
}
