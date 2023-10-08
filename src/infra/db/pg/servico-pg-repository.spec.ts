import { ServicoPgRepository } from './servico-pg-repository';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { knexInstance } from './helpers/knex-helper';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { mapper } from './helpers/mapper';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { PageFilter } from '../../../main/protocols/page-filter';

describe('Servico Postgres Repository', () => {
    let servicos: DbServicoModel[];

    beforeAll(async () => {
        await mockDateAdapter.set(new Date());
        await knexInstance('cliente_carro').del();
        await knexInstance('servico').del();
        await knexInstance('carro').del();
        servicos = await makePgServicoCreate();
    });

    afterAll(async () => {
        await mockDateAdapter.reset();
        await knexInstance('cliente_carro').del();
        await knexInstance('servico').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });

    describe('load()', () => {
        test('Deve retornar uma lista de serviços em caso de sucesso', async () => {
            const sut = makeSut();
            const wrapper = await sut.load();
            expect(servicos).toEqual(wrapper.content);
            expect(servicos.length).toEqual(wrapper.content.length);
        });

        test('Deve retornar uma lista vazia caso não exista serviços', async () => {
            const sut = makeSut();
            jest.spyOn(sut, 'load').mockResolvedValueOnce({ content: [] });
            const wrapper = await sut.load();
            expect(wrapper.content).toEqual([]);
            expect(wrapper.content.length).toEqual(0);
        });

        test('Deve retornar uma lista de serviços paginada em caso de sucesso', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 2 };
            const wrapper = await sut.load(pageFilter);
            expect(servicos).toEqual(wrapper.content);
            expect(servicos.length).toEqual(wrapper.content.length);
            expect(wrapper.pagination.total).toEqual(servicos.length);
            expect(wrapper.pagination.perPage).toEqual(pageFilter.size);
            expect(wrapper.pagination.currentPage).toEqual(pageFilter.page);
            expect(wrapper.pagination.nextPage).toBeNull();
            expect(wrapper.pagination.prevPage).toBeNull();
            expect(wrapper.pagination.from).toEqual(0);
            expect(wrapper.pagination.to).toEqual(servicos.length);
            expect(wrapper.pagination.lastPage).toEqual(1);
        });
    });

    describe('save()', () => {
        test('Deve retornar um serviço em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await makePgCarroCreate();
            const result = await sut.save({
                valor: 10,
                descricao: 'any_descricao',
                quilometragem: 100,
                carro_id: carro.id_carro
            });
            expect(result.id_servico).toBeTruthy();
            expect(result.valor).toEqual(10);
            expect(result.descricao).toEqual('any_descricao');
            expect(result.data).toEqual(new Date());
            expect(result.quilometragem).toEqual(100);
            expect(result.carro_id).toEqual(carro.id_carro);
        });
    });

    describe('update()', () => {
        test('Deve editar em caso de sucesso', async () => {
            const sut = makeSut();
            const result = await sut.update({
                id_servico: servicos[0].id_servico,
                valor: 10,
                descricao: 'other_descricao',
                quilometragem: 100,
                carro_id: servicos[0].carro_id
            });
            expect(result.id_servico).toBeTruthy();
            expect(result.valor).toEqual(10);
            expect(result.descricao).toEqual('other_descricao');
            expect(result.data).toEqual(servicos[0].data);
            expect(result.quilometragem).toEqual(100);
            expect(result.carro_id).toEqual(servicos[0].carro_id);
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
