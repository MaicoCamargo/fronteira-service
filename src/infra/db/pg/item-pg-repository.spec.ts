import { ItemPgRepository } from './item-pg-repository';
import { DbItemModel } from '../../../data/models/db-item-model';
import { knexInstance } from './helpers/knex-helper';
import { mockFakeSaveItemModel } from '../../../../tests/mock/mock-item';
import { PageFilter } from '../../../main/protocols/page-filter';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { DbUpdateItemModel } from '../../../data/protocols/db/item/update-item-repository';
import { DbServicoModel } from '../../../data/models/db-servico-model';
import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';

describe('ItemPgRepository', () => {
    beforeAll(async () => {
        await knexInstance('servico_peca').del();
        await knexInstance('cliente_carro').del();
        await knexInstance('servico').del();
        await knexInstance('carro').del();
        await knexInstance('item').del();
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        await knexInstance.destroy();
        mockDateAdapter.reset();
    });

    describe('load()', () => {
        let createdItens: DbItemModel[];
        beforeAll(async () => {
            createdItens = await makePgItemCreate();
        });
        test('Deve retornar uma lista de item em caso de sucesso', async () => {
            const sut = makeSut();
            const result = await sut.load();
            expect(result.content).toBeTruthy();
            expect(result.content.length).toEqual(createdItens.length);
            expect(result.content).toEqual(createdItens);
        });

        test('Deve retornar uma lista de item paginada em caso de sucesso', async () => {
            const sut = makeSut();
            const filter: PageFilter = {
                page: 1,
                size: 2
            };
            const wrapper = await sut.load(filter);
            expect(wrapper.content).toBeTruthy();
            expect(wrapper.content.length).toEqual(filter.size);
            expect(wrapper.content).toEqual(createdItens);
            expect(wrapper.pagination).toBeTruthy();
            expect(wrapper.pagination.total).toEqual(createdItens.length);
        });
    });

    describe('save()', () => {
        test('Deve retornar criar um item em caso de sucesso', async () => {
            const sut = makeSut();
            const item = mockFakeSaveItemModel();
            const result = await sut.save(item);
            expect(result).toBeTruthy();
            expect(result.id_peca).toBeTruthy();
            expect(result.nome).toEqual(item.nome);
            expect(result.marca).toEqual(item.marca);
            expect(result.valor).toEqual(item.valor);
        });
    });

    describe('update()', () => {
        test('Deve retornar atualizar um item em caso de sucesso', async () => {
            const sut = makeSut();
            const createdItens = await makePgItemCreate();
            const item: DbUpdateItemModel = {
                id_peca: createdItens[0].id_peca,
                nome: 'other_nome',
                marca: 'other_marca',
                valor: 11
            };
            const result = await sut.update(item);
            expect(result).toBeTruthy();
            expect(result.id_peca).toEqual(item.id_peca);
            expect(result.nome).toEqual(item.nome);
            expect(result.marca).toEqual(item.marca);
            expect(result.valor).toEqual(item.valor);
        });
    });

    describe('loadByServico()', () => {
        test('Deve retornar uma lista de item em caso de sucesso', async () => {
            const createdItens = await makePgItemCreate();
            const dbServicoModels: DbServicoModel[] = await makePgServicoCreate();
            await knexInstance('servico_peca').insert([
                {
                    servico_id: dbServicoModels[0].id_servico,
                    peca_id: createdItens[0].id_peca
                },
                {
                    servico_id: dbServicoModels[0].id_servico,
                    peca_id: createdItens[1].id_peca
                }
            ]);
            const sut = makeSut();
            const result = await sut.loadByServico(dbServicoModels[0].id_servico);
            expect(result).toBeTruthy();
            expect(result.length).toEqual(2);
            expect(result[0].marca).toEqual(createdItens[0].marca);
            expect(result[0].nome).toEqual(createdItens[0].nome);
            expect(result[0].valor).toEqual(createdItens[0].valor);
        });
    });
});

const makeSut = (): ItemPgRepository => {
    return new ItemPgRepository();
};

const makePgItemCreate = async (): Promise<DbItemModel[]> => {
    const result = await knexInstance('item')
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
