import { ItemPgRepository } from './item-pg-repository';
import { DbItemModel } from '../../../data/models/db-item-model';
import { knexInstance } from './helpers/knex-helper';
import { mockFakeSaveItemModel } from '../../../../tests/mock/mock-item';
import { PageFilter } from '../../../main/protocols/page-filter';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { DbUpdateItemModel } from '../../../data/protocols/db/item/update-item-repository';

describe('ItemPgRepository', () => {
    beforeAll(async () => {
        await knexInstance('peca').del();
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        await knexInstance('peca').del();
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
});

const makeSut = (): ItemPgRepository => {
    return new ItemPgRepository();
};

const makePgItemCreate = async (): Promise<DbItemModel[]> => {
    const result = await knexInstance('peca')
        .insert([
            mockFakeSaveItemModel(),
            {
                nome: 'other_nome',
                marca: 'other_marca',
                valor: 11,
                updated_at: new Date()
            }
        ])
        .returning('*');
    return result;
};
