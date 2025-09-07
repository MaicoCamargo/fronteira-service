import { DbItemModel } from '../../src/data/models/db-item-model';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { mockFakeSaveItemModel } from './mock-item';

export const makePgItemCreate = async (): Promise<DbItemModel[]> => {
    const result = await KnexHelper.forTenant()
        .table('item')
        .insert([
            mockFakeSaveItemModel(),
            {
                nome: 'other_nome',
                marca: 'other_marca',
                valor: 11,
                last_updated: new Date()
            }
        ])
        .returning('*');
    return result;
};
