import { Wrapper } from '@/main/protocols/http-wrapper';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadMechanics {
    load: (pageFilter?: PageFilter) => Promise<Wrapper<MechanicModel[]>>;
}
