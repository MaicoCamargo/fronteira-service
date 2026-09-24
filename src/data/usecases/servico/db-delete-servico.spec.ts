import { DbDeleteServico } from './db-delete-servico';
import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';
import { DeleteBillingIntegration } from '@/data/protocols/client/billing-service/delete-billing-integration';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';
import { makeRedisCacheRepository } from '../../../../tests/mock/mock-redis-cache-repository';

describe('DbDeleteServico Use Case', () => {
    afterAll(async () => {
        await RedisHelper.disconnect();
    });

    test('Deve chamar o DeleteServicoRepository com os valores corretos', async () => {
        const { sut, deleteServicoRepositoryStub } = makeSut();
        const id = 1;
        const deleteSpy = jest.spyOn(deleteServicoRepositoryStub, 'delete');
        await sut.delete(id);
        expect(deleteSpy).lastCalledWith(id);
        const cached = await (await RedisHelper.getClient()).scan(0, { MATCH: `orders::list*` });
        expect(cached.keys).toHaveLength(0);
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
    redisCacheRepositoryStub: RedisCacheRepository;
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
    const redisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbDeleteServico(
        deleteServicoRepositoryStub,
        deleteBillingIntegrationStub,
        redisCacheRepositoryStub
    );
    return {
        sut,
        deleteServicoRepositoryStub,
        deleteBillingIntegrationStub,
        redisCacheRepositoryStub
    };
};
