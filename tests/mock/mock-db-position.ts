import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { DbPositionModel } from '@/data/models/db-position-model';

export const makePositionCreate = async (): Promise<DbPositionModel[]> => {
    const created: DbPositionModel[] = [];
    let result = await KnexHelper.forTenant()
        .table('position')
        .insert(created)
        .insert({
            name: 'any_name',
            description: 'any_description'
        })
        .returning(['id_position', 'name', 'description']);
    created.push(result[0]);
    result = await KnexHelper.forTenant()
        .table('position')
        .insert(created)
        .insert({
            name: 'other_name',
            description: 'other_description'
        })
        .returning(['id_position', 'name', 'description']);
    created.push(result[0]);
    return created;
};
