import { ServicoPgRepository } from './servico-pg-repository';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { knexInstance } from './helpers/knex-helper';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { mapper } from './helpers/mapper';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';

describe('Servico Postgres Repository', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
        await knexInstance('servico').del();
        await knexInstance('carro').del();
    });

    afterAll(async () => {
        mockDateAdapter.reset();
        await knexInstance('servico').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });

    describe('load()', () => {
        test('Deve retornar uma lista de serviços em caso de sucesso', async () => {
            const result = await makePgServicoCreate();
            const sut = makeSut();
            const wrapper = await sut.load();
            expect(result).toEqual(wrapper.content);
            expect(result.length).toEqual(wrapper.content.length);
        });
    });
});

const makeSut = (): ServicoPgRepository => {
    return new ServicoPgRepository();
};

const makePgCarroCreate = async (): Promise<DbCarroModel> => {
    const result = mapper(
        await knexInstance('carro')
            .insert({
                ano: 2023,
                cor: 'any_cor',
                quilometragem: 100,
                modelo: 'any_modelo',
                placa: 'any_placa'
            })
            .returning('*')
    );
    return {
        id_carro: result.id_carro,
        ano: result.ano,
        cor: result.cor,
        quilometragem: result.quilometragem,
        modelo: result.modelo,
        placa: result.placa
    };
};

const makePgServicoCreate = async (): Promise<DbServicoModel[]> => {
    const carro = await makePgCarroCreate();
    const result: DbServicoModel[] = [];
    let create = await knexInstance('servico')
        .insert({ valor: 10, carro_id: carro.id_carro })
        .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
    result.push(create[0]);
    create = await knexInstance('servico')
        .insert({ valor: 11, carro_id: carro.id_carro })
        .returning(['id_servico', 'valor', 'descricao', 'data', 'quilometragem', 'last_updated', 'carro_id']);
    result.push(create[0]);
    return result;
};
