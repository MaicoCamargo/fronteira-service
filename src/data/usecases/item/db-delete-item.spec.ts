import { DeleteItemRepository } from '../../protocols/db/item/delete-item-repository';
import { DbDeleteItem } from './db-delete-item';

describe('DbDeleteItem Use Case', () => {
    test('Deve chamar DeleteItemRepository com valor correto', () => {
        const { sut, deleteItemRepositoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteItemRepositoryStub, 'delete');
        const id = 1;
        sut.delete(id);
        expect(deleteSpy).toHaveBeenCalledWith(id);
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
