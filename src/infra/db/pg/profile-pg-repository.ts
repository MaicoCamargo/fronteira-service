import { DbProfileModel } from '@/data/models/db-profile-model';
import { LoadProfileByMailRepository } from '@/data/protocols/db/profile/load-profile-by-mail-repository';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { mapper } from '@/infra/db/pg/helpers/mapper';
import { SaveProfileModel, SaveProfileRepository } from '@/data/protocols/db/profile/save-profile-repository';

export class ProfilePgRepository implements LoadProfileByMailRepository, SaveProfileRepository {
    async loadByMail(mail: string): Promise<DbProfileModel> {
        const query = await knexInstance('profile')
            .select(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact'])
            .where({ mail });
        return mapper(query);
    }

    async save(model: SaveProfileModel): Promise<DbProfileModel> {
        const saved = await knexInstance('profile')
            .insert(model)
            .returning(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact']);
        return mapper(saved);
    }
}
