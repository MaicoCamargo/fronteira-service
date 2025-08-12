import { DbAddProfile } from '@/data/usecases/profile/db-add-profile';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';

export const makeDbAddProfile = (): DbAddProfile => {
    const profilePgRepository = new ProfilePgRepository();
    return new DbAddProfile(profilePgRepository);
};
