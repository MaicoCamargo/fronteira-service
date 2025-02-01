import { Wrapper } from '@/main/protocols/http-wrapper';
import { MechanicModel } from '@/domain/models/mechanic-model';

export interface LoadMechanics {
    load: () => Promise<Wrapper<MechanicModel[]>>;
}
