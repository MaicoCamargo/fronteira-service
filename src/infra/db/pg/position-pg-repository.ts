import { LoadPositionByProfileIdRepository } from '@/data/protocols/db/position/load-position-by-profile-id-repository';
import { DbPositionModel } from '@/data/models/db-position-model';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';

export class PositionPgRepository implements LoadPositionByProfileIdRepository {
    async loadByIdProfile(profile: number): Promise<DbPositionModel[]> {
        return await knexInstance('position')
            .leftJoin('profile_position', 'position.id_position', 'profile_position.position_id')
            .where({ profile_id: profile })
            .select(['position.*']);
    }
}
