import { DbAddItem } from './db-add-item';
import { SaveItemModel, SaveItemRepository } from '../../protocols/db/item/save-item-repository';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeAddItemParams, mockFakeDbItemModel } from '../../../../tests/mock/mock-item';
import { knexInstance } from '../../../infra/db/pg/helpers/knex-helper';

describe('DbAddItem Use Case', () => {
    beforeAll(async () => {
        await knexInstance('peca').del();
    });

    afterAll(async () => {
        await knexInstance('peca').del();
        await knexInstance.destroy();
    });

    test('Deve chamar AddItemRepository com valores corretos', () => {
        const { sut, saveItemRepositoryStub } = makeSut();
        const addItemSpy = jest.spyOn(saveItemRepositoryStub, 'save');
        const item = mockFakeAddItemParams();
        sut.add(item);
        expect(addItemSpy).toHaveBeenCalledWith(item);
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
    const sut = new DbAddItem(saveItemRepositoryStub);
    return {
        sut,
        saveItemRepositoryStub
    };
};
