import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { DbLoadProfiles } from '@/data/usecases/profile/db-load-profiles';
import { PositionPgRepository } from '@/infra/db/pg/position-pg-repository';

export const makeDbLoadProfiles = (): DbLoadProfiles => {
    const profilePgRepository = new ProfilePgRepository();
    const positionPgRepository = new PositionPgRepository();
    return new DbLoadProfiles(profilePgRepository, positionPgRepository);
};
