import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { DbProfileModel } from '@/data/models/db-profile-model';
import { mockFakeDbProfileModel } from './mock-profile';

export const makeLoadProfileByUsernameRepository = (): LoadProfileByUsernameRepository => {
    class LoadProfileByUsernameRepositoryStub implements LoadProfileByUsernameRepository {
        async loadByUsername(username: string): Promise<DbProfileModel> {
            return await Promise.resolve(mockFakeDbProfileModel());
        }
    }
    return new LoadProfileByUsernameRepositoryStub();
};
