import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';

export interface LoadMechanicsRepository {
    load: () => Promise<Wrapper<DbMechanicModel[]>>;
}
