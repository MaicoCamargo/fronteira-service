import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';
import { DbDeleteCliente } from './db-delete-cliente';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbDeleteCliente Usecase', () => {
    test('Deve chamar DeleteClienteRepository com valores corretos', async () => {
        const { sut, deleteClienteRepositoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteClienteRepositoryStub, 'delete');
        const id = 1;
        await sut.delete(id);
        expect(deleteSpy).toHaveBeenCalledWith(id);
    });

    test('Deve lançar exceção se DeleteClienteRepository lançar exceção', async () => {
        const { sut, deleteClienteRepositoryStub } = makeSut();
        jest.spyOn(deleteClienteRepositoryStub, 'delete').mockImplementationOnce(throwError);
        const promise = sut.delete(1);
        await expect(promise).rejects.toThrow();
    });

    test('Deve remover o cliente em caso de sucesso', async () => {
        const { sut } = makeSut();
        const id = 1;
        const cliente = await sut.delete(id);
        expect(cliente).toBeUndefined();
    });
});

interface SutTypes {
    sut: DbDeleteCliente;
    deleteClienteRepositoryStub: DeleteClienteRepository;
}
const makeSut = (): SutTypes => {
    const deleteClienteRepositoryStub = makeDeleteClienteRepository();
    const sut = new DbDeleteCliente(deleteClienteRepositoryStub);
    return {
        sut,
        deleteClienteRepositoryStub
    };
};

const makeDeleteClienteRepository = (): DeleteClienteRepository => {
    class DeleteClienteRepositoryStub implements DeleteClienteRepository {
        async delete(id: number): Promise<void> {
            return;
        }
    }
    return new DeleteClienteRepositoryStub();
};
