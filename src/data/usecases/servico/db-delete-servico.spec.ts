import { DbDeleteServico } from './db-delete-servico';
import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';
import { DeleteBillingIntegration } from '@/data/protocols/client/billing-service/delete-billing-integration';

describe('DbDeleteServico Use Case', () => {
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
    sut: DbDeleteServico;
    deleteServicoRepositoryStub: DeleteServicoRepository;
    deleteBillingIntegrationStub: DeleteBillingIntegration;
};

const makeDeleteServicoRepositoryStub = (): DeleteServicoRepository => {
    class DeleteServicoRepositorySpy implements DeleteServicoRepository {
        delete(id: number): Promise<void> {
            return Promise.resolve(undefined);
        }
    }
    return new DeleteServicoRepositorySpy();
};

const makeDeleteBillingIntegration = (): DeleteBillingIntegration => {
    class DeleteBillingIntegrationStub implements DeleteBillingIntegration {
        delete(id: number): Promise<void> {
            return Promise.resolve();
        }
    }
    return new DeleteBillingIntegrationStub();
};

const makeSut = (): SutTypes => {
    const deleteServicoRepositoryStub = makeDeleteServicoRepositoryStub();
    const deleteBillingIntegrationStub = makeDeleteBillingIntegration();
    const sut = new DbDeleteServico(deleteServicoRepositoryStub, deleteBillingIntegrationStub);
    return {
        sut,
        deleteServicoRepositoryStub,
        deleteBillingIntegrationStub
    };
};
