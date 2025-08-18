import { DbProfileModel } from '../../src/data/models/db-profile-model';
import { DbPositionModel } from '../../src/data/models/db-position-model';
import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';

export const makeProfilePositionCreate = async (profile: DbProfileModel, position: DbPositionModel): Promise<void> => {
    await knexInstance('profile_position').insert({
        profile_id: profile.id_profile,
        position_id: position.id_position
    });
};
