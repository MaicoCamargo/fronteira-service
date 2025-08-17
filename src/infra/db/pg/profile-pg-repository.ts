import { DbProfileModel } from '@/data/models/db-profile-model';
import { LoadProfileByMailRepository } from '@/data/protocols/db/profile/load-profile-by-mail-repository';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { mapper } from '@/infra/db/pg/helpers/mapper';
import { SaveProfileModel, SaveProfileRepository } from '@/data/protocols/db/profile/save-profile-repository';
import { LoadProfileDbFilter, LoadProfilesRepository } from '@/data/protocols/db/profile/load-profiles-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { Filter } from '@/main/protocols/filter';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';

export class ProfilePgRepository implements LoadProfileByMailRepository, SaveProfileRepository, LoadProfilesRepository {
    async loadByMail(mail: string): Promise<DbProfileModel> {
        const query = await knexInstance('profile')
            .select(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact'])
            .where({ mail });
        return mapper(query);
    }

    async save(model: SaveProfileModel, positions?: number[]): Promise<DbProfileModel> {
        const saved = await knexInstance('profile')
            .insert({
                username: model.username,
                firstName: model.firstName,
                lastName: model.lastName,
                mail: model.mail,
                birthday: model.birthday,
                nickname: model.nickname,
                contact: model.contact
            })
            .returning(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact']);

        if (Array.isArray(positions)) {
            for (const position of positions) {
                await knexInstance('profile_position').insert({
                    profile_id: saved[0].id_profile,
                    position_id: position
                });
            }
        }

        return mapper(saved);
    }

    async load(filters?: Filter<LoadProfileDbFilter>): Promise<Wrapper<DbProfileModel[]>> {
        let query: any;
        if (filters?.params) {
            query = knexInstance('profile')
                .select(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact'])
                .whereNull('dh_exclusion');
            if (filters.params.nickname) {
                query.andWhereILike('nickname', `%${filters.params.nickname}%`);
            }
            if (filters.params.firstName) {
                query.andWhereILike('firstName', `%${filters.params.firstName}%`);
            }
            if (filters.params.lastName) {
                query.andWhereILike('lastName', `%${filters.params.lastName}%`);
            }
        } else {
            query = knexInstance('profile')
                .select(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact'])
                .whereNull('dh_exclusion');
        }
        query.orderBy('firstName');
        return await knexPaginateAdapter(query, filters?.pageFilter);
    }
}
