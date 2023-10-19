import { DbDelServico } from './db-del-servico';
import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';

describe('DbDelServico Use Case', () => {
    test('Deve chamar o DeleteServicoRepository com os valores corretos', async () => {
        const { sut, deleteServicoRepositoryStub } = makeSut();
        const id = 1;
        const deleteSpy = jest.spyOn(deleteServicoRepositoryStub, 'delete');
        await sut.delete(id);
        expect(deleteSpy).lastCalledWith(id);
    });

    test('Deve lançar exceção se o DeleteServicoRepository lançar exceção', async () => {
        const { sut, deleteServicoRepositoryStub } = makeSut();
        const id = 1;
        jest.spyOn(deleteServicoRepositoryStub, 'delete').mockRejectedValueOnce(new Error());
        const promise = sut.delete(id);
        await expect(promise).rejects.toThrow();
    });
});

type SutTypes = {
    sut: DbDelServico;
    deleteServicoRepositoryStub: DeleteServicoRepository;
};

const makeDeleteServicoRepositoryStub = (): DeleteServicoRepository => {
    class DeleteServicoRepositorySpy implements DeleteServicoRepository {
        delete(id: number): Promise<void> {
            return Promise.resolve(undefined);
        }
    }
    return new DeleteServicoRepositorySpy();
};

const makeSut = (): SutTypes => {
    const deleteServicoRepositoryStub = makeDeleteServicoRepositoryStub();
    const sut = new DbDelServico(deleteServicoRepositoryStub);
    return {
        sut,
        deleteServicoRepositoryStub
    };
};
