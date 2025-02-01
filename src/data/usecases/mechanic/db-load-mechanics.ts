import { MechanicModel } from '@/domain/models/mechanic-model';
import { LoadMechanics } from '@/domain/usecases/mechanic/load-mechanics';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class DbLoadMechanics implements LoadMechanics {
    async load(): Promise<Wrapper<MechanicModel[]>> {
        return await Promise.resolve({ content: [] });
    }
}
