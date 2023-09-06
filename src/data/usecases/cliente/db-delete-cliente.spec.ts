import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';
import { DbDeleteCliente } from './db-delete-cliente';

describe('DbDeleteCliente Usecase', () => {
    test('Deve chamar DeleteClienteRepository com valores corretos', async () => {
        const { sut, deleteClienteRepositoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteClienteRepositoryStub, 'delete');
        const id = 1;
        await sut.delete(id);
        expect(deleteSpy).toHaveBeenCalledWith(id);
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
