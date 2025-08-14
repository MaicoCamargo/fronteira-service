import { LoadProfileDbFilter, LoadProfilesRepository } from '@/data/protocols/db/profile/load-profiles-repository';
import { LoadProfiles, LoadProfilesParams } from '@/domain/usecases/profile/load-profiles';
import { Filter } from '@/main/protocols/filter';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { ProfileModel } from '@/domain/models/profile-model';

export class DbLoadProfiles implements LoadProfiles {
    constructor(private readonly loadProfilesRepository: LoadProfilesRepository) {}

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
        const map: ProfileModel[] = wrapper.content.map((profile) => ({
            ...profile,
            positions: [],
            contact: profile.contact ? profile.contact.split('::') : null
        }));
        return {
            content: map,
            pagination: wrapper.pagination
        };
    }
}
