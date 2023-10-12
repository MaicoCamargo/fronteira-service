import { DbServicoModel } from '../../src/data/models/db-servico-model';
import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';
import { mockFakeDbServicoModelList } from './mock-servico';
import { makePgCarroCreate } from './mock-db-carro';

export const makePgServicoCreate = async (): Promise<DbServicoModel[]> => {
    const carros = await makePgCarroCreate();
    return knexInstance('servico')
        .insert([
            { ...mockFakeDbServicoModelList()[0], carro_id: carros[0].id_carro },
            { ...mockFakeDbServicoModelList()[1], carro_id: carros[1].id_carro }
        ])
        .returning('*') as any;
};
