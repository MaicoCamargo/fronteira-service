import { DbProfileModel } from '@/data/models/db-profile-model';
import { LoadProfileByMailRepository } from '@/data/protocols/db/profile/load-profile-by-mail-repository';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { mapper } from '@/infra/db/pg/helpers/mapper';

export class ProfilePgRepository implements LoadProfileByMailRepository {
    async loadByMail(mail: string): Promise<DbProfileModel> {
        const query = await knexInstance('profile')
            .select(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact'])
            .where({ mail });
        return mapper(query);
    }
}
