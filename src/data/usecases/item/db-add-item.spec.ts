import { DbAddItem } from './db-add-item';
import { SaveItemModel, SaveItemRepository } from '../../protocols/db/item/save-item-repository';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeAddItemParams, mockFakeDbItemModel, mockFakeItemModel } from '../../../../tests/mock/mock-item';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { throwError } from '../../../../tests/helper/test-helper';
import { makeRedisCacheRepository } from '../../../../tests/mock/mock-redis-cache-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';

describe('DbAddItem Use Case', () => {
    beforeAll(async () => {
        KnexHelper.forTenant().table('servico_peca').del();
        KnexHelper.forTenant().table('item').del();
    });

    afterAll(async () => {
        await KnexHelper.destroy();
        await RedisHelper.disconnect();
    });

    test('Deve chamar AddItemRepository com valores corretos', () => {
        const { sut, saveItemRepositoryStub } = makeSut();
        const addItemSpy = jest.spyOn(saveItemRepositoryStub, 'save');
        const item = mockFakeAddItemParams();
        sut.add(item);
        expect(addItemSpy).toHaveBeenCalledWith(item);
    });

    test('Deve retornar um item em caso de sucesso', async () => {
        const { sut } = makeSut();
        const item = mockFakeAddItemParams();
        const response = await sut.add(item);
        expect(response).toEqual(mockFakeItemModel());
    });

    test('Deve lançar exceção se SaveItemRepository lançar exceção', async () => {
        const { sut, saveItemRepositoryStub } = makeSut();
        jest.spyOn(saveItemRepositoryStub, 'save').mockImplementationOnce(throwError);
        const item = mockFakeAddItemParams();
        const promise = sut.add(item);
        await expect(promise).rejects.toThrow();
    });
});

const makeAddItemRepository = (): SaveItemRepository => {
    class SaveItemRepositoryStub implements SaveItemRepository {
        async save(item: SaveItemModel): Promise<DbItemModel> {
            return mockFakeDbItemModel();
        }
    }
    return new SaveItemRepositoryStub();
};

interface SutTypes {
    sut: DbAddItem;
    saveItemRepositoryStub: SaveItemRepository;
}
const makeSut = (): SutTypes => {
    const saveItemRepositoryStub = makeAddItemRepository();
    const redisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbAddItem(saveItemRepositoryStub, redisCacheRepositoryStub);
    return {
        sut,
        saveItemRepositoryStub
    };
};
