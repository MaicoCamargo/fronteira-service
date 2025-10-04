import { KnexHelper } from '../../src/infra/db/pg/helpers/knex-helper';
import { DbCarroModel } from '../../src/data/models/db-carro-model';
import { mockFakeAddCarroModel } from './mock-carro';
import { makePgClienteCreate } from './mock-db-cliente';

export const makePgCarroCreate = async (): Promise<DbCarroModel[]> => {
    const cliente = await makePgClienteCreate();
    const carros = (await KnexHelper.forTenant()
        .table('carro')
        .insert([
            mockFakeAddCarroModel(),
            {
                cor: 'other_color',
                ano: 1996,
                modelo: 'other_modelo',
                placa: 'other_placa',
                quilometragem: 129911
            }
        ])
        .returning('*')) as DbCarroModel[];
    await KnexHelper.forTenant()
        .table('cliente_carro')
        .insert([
            { cliente_id: cliente.id_cliente, carro_id: carros[0].id_carro },
            { cliente_id: cliente.id_cliente, carro_id: carros[1].id_carro }
        ]);
    return carros;
};
