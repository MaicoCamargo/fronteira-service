import { DbProfileModel } from '@/data/models/db-profile-model';

export type SaveProfileModel = Omit<DbProfileModel, 'id_profile'>;

export interface SaveProfileRepository {
    save: (model: SaveProfileModel, positions?: number[]) => Promise<DbProfileModel>;
}
