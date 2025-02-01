import { DbLoadMechanics } from '@/data/usecases/mechanic/db-load-mechanics';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';

export const makeDbLoadMechanics = (): DbLoadMechanics => {
    const mechanicPgRepository = new MechanicPgRepository();
    return new DbLoadMechanics(mechanicPgRepository);
};
