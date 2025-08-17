import { DbPositionModel } from '@/data/models/db-position-model';

export interface LoadPositionByProfileIdRepository {
    loadByIdProfile: (profile: number) => Promise<DbPositionModel[]>;
}
