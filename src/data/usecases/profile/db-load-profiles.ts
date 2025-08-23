import { LoadProfileDbFilter, LoadProfilesRepository } from '@/data/protocols/db/profile/load-profiles-repository';
import { LoadProfiles, LoadProfilesParams } from '@/domain/usecases/profile/load-profiles';
import { Filter } from '@/main/protocols/filter';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { ProfileModel } from '@/domain/models/profile-model';
import { LoadPositionByProfileIdRepository } from '@/data/protocols/db/position/load-position-by-profile-id-repository';
import { PositionModel } from '@/domain/models/position-model';
import { DbProfileModel } from '@/data/models/db-profile-model';

export class DbLoadProfiles implements LoadProfiles {
    constructor(
        private readonly loadProfilesRepository: LoadProfilesRepository,
        private readonly loadPositionByProfileIdRepository: LoadPositionByProfileIdRepository
    ) {}

    async load(params: LoadProfilesParams): Promise<Wrapper<ProfileModel[]>> {
        const filters: Filter<LoadProfileDbFilter> = {};
        if (params) {
            const { page, size, ...paramsWithoutPageFilter } = params;
            filters.params = paramsWithoutPageFilter;
            if (page && size) {
                filters.pageFilter = { page, size };
            }
        }
        const wrapper = await this.loadProfilesRepository.load({ ...filters });
        const profiles: Array<Promise<ProfileModel>> = wrapper.content.map(async (profile: DbProfileModel) => ({
            positions: await this.loadPositions(profile.id_profile),
            contacts: profile.contact ? profile.contact.split('::') : [],
            ...profile
        }));
        return {
            content: await Promise.all(profiles),
            pagination: wrapper.pagination
        };
    }

    private async loadPositions(profile: number): Promise<PositionModel[]> {
        const model = await this.loadPositionByProfileIdRepository.loadByIdProfile(profile);
        return model.map((position) => ({ id: position.id_position, name: position.name }));
    }
}
