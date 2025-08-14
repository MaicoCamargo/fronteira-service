import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { DbLoadProfiles } from '@/data/usecases/profile/db-load-profiles';

export const makeDbLoadProfiles = (): DbLoadProfiles => {
    const profilePgRepository = new ProfilePgRepository();
    return new DbLoadProfiles(profilePgRepository);
};
