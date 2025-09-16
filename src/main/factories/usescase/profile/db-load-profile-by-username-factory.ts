import { DbLoadProfileByUsername } from '@/data/usecases/profile/db-load-profile-by-username';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { PositionPgRepository } from '@/infra/db/pg/position-pg-repository';

export const makeDbLoadProfileByUsername = (): DbLoadProfileByUsername => {
    const profileRepository = new ProfilePgRepository();
    const positionRepository = new PositionPgRepository();
    return new DbLoadProfileByUsername(profileRepository, positionRepository);
};
