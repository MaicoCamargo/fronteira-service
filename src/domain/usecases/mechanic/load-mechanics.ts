import { Wrapper } from '@/main/protocols/http-wrapper';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadMechanicsParams extends PageFilter {
    firstName?: string;
    lastName?: string;
    nickname?: string;
}

export interface LoadMechanics {
    load: (params?: LoadMechanicsParams) => Promise<Wrapper<MechanicModel[]>>;
}
