import { DbAddProfile } from '@/data/usecases/profile/db-add-profile';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { PositionPgRepository } from '@/infra/db/pg/position-pg-repository';

export const makeDbAddProfile = (): DbAddProfile => {
    const profilePgRepository = new ProfilePgRepository();
    const positionPgRepository = new PositionPgRepository();
    return new DbAddProfile(profilePgRepository, positionPgRepository);
};
