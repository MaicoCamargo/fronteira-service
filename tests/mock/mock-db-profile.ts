import { DbProfileModel } from '../../src/data/models/db-profile-model';
import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';

export const makeProfileCreate = async (): Promise<DbProfileModel[]> => {
    return await knexInstance('profile')
        .insert([
            {
                username: 'any_username',
                firstName: 'any_first_name',
                lastName: 'any_last_name',
                mail: 'any_mail',
                birthday: new Date(),
                nickname: 'any_nickname',
                contact: 'any_contact'
            },
            {
                username: 'other_username',
                firstName: 'other_first_name',
                lastName: 'other_last_name',
                mail: 'other_mail',
                birthday: new Date(),
                nickname: 'other_nickname',
                contact: 'other_contact'
            }
        ])
        .returning(['id_profile', 'username', 'firstName', 'lastName', 'mail', 'birthday', 'nickname', 'contact']);
};
