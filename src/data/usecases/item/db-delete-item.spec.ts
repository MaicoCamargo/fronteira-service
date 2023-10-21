import { DeleteItemRepository } from '../../protocols/db/item/delete-item-repository';
import { DbDeleteItem } from './db-delete-item';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbDeleteItem Use Case', () => {
    test('Deve chamar DeleteItemRepository com valor correto', async () => {
        const { sut, deleteItemRepositoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteItemRepositoryStub, 'delete');
        const id = 1;
        await sut.delete(id);
        expect(deleteSpy).toHaveBeenCalledWith(id);
    });

    test('Deve lançar exceção se DeleteItemRepository lançar exceção', async () => {
        const { sut, deleteItemRepositoryStub } = makeSut();
        jest.spyOn(deleteItemRepositoryStub, 'delete').mockImplementationOnce(throwError);
        const promise = sut.delete(1);
        await expect(promise).rejects.toThrow();
    });
});

interface SutTypes {
    sut: DbDeleteItem;
    deleteItemRepositoryStub: DeleteItemRepository;
}

const makeDeleteItemRepository = (): DeleteItemRepository => {
    class DeleteItemRepositoryStub implements DeleteItemRepository {
        async delete(id: number): Promise<void> {
            return new Promise((resolve) => resolve());
        }
    }
    return new DeleteItemRepositoryStub();
};

const makeSut = (): SutTypes => {
    const deleteItemRepositoryStub = makeDeleteItemRepository();
    const sut = new DbDeleteItem(deleteItemRepositoryStub);
    return {
        sut,
        deleteItemRepositoryStub
    };
};
