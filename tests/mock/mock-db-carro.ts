import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';
import { DbCarroModel } from '../../src/data/models/db-carro-model';
import { mockFakeAddCarroModel } from './mock-carro';
import { makePgClienteCreate } from './mock-db-cliente';

export const makePgCarroCreate = async (): Promise<DbCarroModel[]> => {
    const cliente = await makePgClienteCreate();
    const carros = (await knexInstance('carro')
        .insert([mockFakeAddCarroModel(), mockFakeAddCarroModel()])
        .returning('*')) as DbCarroModel[];
    await knexInstance('cliente_carro').insert([
        { cliente_id: cliente.id_cliente, carro_id: carros[0].id_carro },
        { cliente_id: cliente.id_cliente, carro_id: carros[1].id_carro }
    ]);
    return carros;
};
