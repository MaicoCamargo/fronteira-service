import { DbUpdateItem } from './db-update-item';
import { UpdateItemRepository } from '../../protocols/db/item/update-item-repository';
import { DbItemModel } from '../../models/db-item-model';
import {
    mockFakeDbItemModel,
    mockFakeDbUpdateItemModel,
    mockFakeUpdateItemModel
} from '../../../../tests/mock/mock-item';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { throwError } from '../../../../tests/helper/test-helper';

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

    test('Deve lançar exceção se UpdateItemRepository lançar exceção', async () => {
        const { sut, updateItemRepositoryStub } = makeSut();
        jest.spyOn(updateItemRepositoryStub, 'update').mockImplementationOnce(throwError);
        const promise = sut.update(mockFakeUpdateItemModel());
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar um item atualizado em caso de sucesso', async () => {
        const { sut } = makeSut();
        const item = await sut.update(mockFakeUpdateItemModel());
        expect(item).toEqual(mockFakeUpdateItemModel());
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
            return Promise.resolve(mockFakeDbUpdateItemModel());
        }
    }
    return new UpdateItemRepositoryStub();
};
