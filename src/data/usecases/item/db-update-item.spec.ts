import { DbUpdateItem } from './db-update-item';
import { UpdateItemRepository } from '../../protocols/db/item/update-item-repository';
import { DbItemModel } from '../../models/db-item-model';
import {
    mockFakeDbItemModel,
    mockFakeDbUpdateItemModel,
    mockFakeUpdateItemModel
} from '../../../../tests/mock/mock-item';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';

describe('DbUpateItem Use Case', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        mockDateAdapter.reset();
    });

    test('Deve chamar UpdateItemRepository com valores corretos', async () => {
        const { sut, updateItemRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateItemRepositoryStub, 'update');
        await sut.update(mockFakeUpdateItemModel());
        expect(updateSpy).toHaveBeenCalledWith(mockFakeDbUpdateItemModel());
    });
});

interface SutTypes {
    sut: DbUpdateItem;
    updateItemRepositoryStub: UpdateItemRepository;
}
const makeSut = (): SutTypes => {
    const updateItemRepositoryStub = makeUpdateItemRepository();
    const sut = new DbUpdateItem(updateItemRepositoryStub);
    return {
        sut,
        updateItemRepositoryStub
    };
};

const makeUpdateItemRepository = (): UpdateItemRepository => {
    class UpdateItemRepositoryStub implements UpdateItemRepository {
        update(item: DbItemModel): Promise<DbItemModel> {
            return Promise.resolve(mockFakeDbItemModel());
        }
    }
    return new UpdateItemRepositoryStub();
};
