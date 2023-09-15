import { ItemPgRepository } from './item-pg-repository';
import { DbItemModel } from '../../../data/models/db-item-model';
import { knexInstance } from './helpers/knex-helper';
import { mockFakeSaveItemModel } from '../../../../tests/mock/mock-item';

describe('ItemPgRepository', () => {
    beforeAll(async () => {
        await knexInstance('peca').del();
    });

    afterAll(async () => {
        await knexInstance('peca').del();
        await knexInstance.destroy();
    });

    describe('load()', () => {
        test('Deve retornar uma lista de item em caso de sucesso', async () => {
            const createdItens = await makePgItemCreate();
            const sut = makeSut();
            const result = await sut.load();
            expect(result.content).toBeTruthy();
            expect(result.content.length).toEqual(createdItens.length);
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
