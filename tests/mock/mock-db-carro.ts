import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';
import { DbCarroModel } from '../../src/data/models/db-carro-model';
import { mockFakeDbCarroModelList } from './mock-carro';

export const makePgCarroCreate = async (): Promise<DbCarroModel[]> => {
    const result = await knexInstance('carro').insert(mockFakeDbCarroModelList()).returning('*');
    return result;
};
