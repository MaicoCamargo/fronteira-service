import { MechanicModel } from '@/domain/models/mechanic-model';
import { LoadMechanics, LoadMechanicsParams } from '@/domain/usecases/mechanic/load-mechanics';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { PageFilter } from '@/main/protocols/page-filter';
import { LoadProfileDbFilter } from '@/data/protocols/db/profile/load-profiles-repository';
import { Filter } from '@/main/protocols/filter';

export class DbLoadMechanics implements LoadMechanics {
    constructor(private readonly loadMechanicsRepository: LoadMechanicsRepository) {}

    async load(params?: LoadMechanicsParams): Promise<Wrapper<MechanicModel[]>> {
        const pageFilter: PageFilter = { ...params };
        const loadProfileDbParams: Filter<LoadProfileDbFilter> = {
            params,
            pageFilter
        };

        const wrapper = await this.loadMechanicsRepository.load(loadProfileDbParams);
        const mechanics: MechanicModel[] = wrapper.content.map((db) => ({
            id: db.id_mecanico,
            name: `${db.firstName} ${db.lastName}`,
            nickname: db.nickname
        }));
        return { content: mechanics, pagination: wrapper.pagination };
    }
}
