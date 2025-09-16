import { DbLoadProfileByMail } from '@/data/usecases/profile/db-load-profile-by-mail';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { PositionPgRepository } from '@/infra/db/pg/position-pg-repository';

export const makeDbLoadProfileByMail = (): DbLoadProfileByMail => {
    const profileRepository = new ProfilePgRepository();
    const positionRepository = new PositionPgRepository();
    return new DbLoadProfileByMail(profileRepository, positionRepository);
};
