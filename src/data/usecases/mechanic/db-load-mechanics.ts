import { MechanicModel } from '@/domain/models/mechanic-model';
import { LoadMechanics } from '@/domain/usecases/mechanic/load-mechanics';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { PageFilter } from '@/main/protocols/page-filter';

export class DbLoadMechanics implements LoadMechanics {
    constructor(private readonly loadMechanicsRepository: LoadMechanicsRepository) {}

    async load(pageFilter?: PageFilter): Promise<Wrapper<MechanicModel[]>> {
        const wrapper = await this.loadMechanicsRepository.load(pageFilter);
        const mechanics: MechanicModel[] = wrapper.content.map((db) => ({
            id: db.id_mecanico,
            name: db.nome
        }));
        return { content: mechanics, pagination: wrapper.pagination };
    }
}
