import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class MechanicPgRepository implements LoadMechanicsRepository {
    async load(): Promise<Wrapper<DbMechanicModel[]>> {
        return { content: [] };
    }
}
