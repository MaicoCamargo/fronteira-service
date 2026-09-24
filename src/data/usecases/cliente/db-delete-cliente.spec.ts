import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';
import { DbDeleteCliente } from './db-delete-cliente';
import { throwError } from '../../../../tests/helper/test-helper';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { mockFakeDbCarroModelList } from '../../../../tests/mock/mock-carro';
import { DeleteCarroRepository } from '../../protocols/db/carro/delete-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';
import { makeRedisCacheRepository } from '../../../../tests/mock/mock-redis-cache-repository';

describe('DbDeleteCliente Use Case', () => {
    afterAll(async () => {
        await RedisHelper.disconnect();
    });

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
        const { sut, deleteCarroRepositoryStub, loadCarroByClienteRepositoryStub } = makeSut();
        const id = 1;
        const loadSpy = jest.spyOn(loadCarroByClienteRepositoryStub, 'loadByClienteId');
        const deleteSpy = jest.spyOn(deleteCarroRepositoryStub, 'delete');
        const cliente = await sut.delete(id);
        expect(loadSpy).toHaveBeenCalledWith(id);
        expect(deleteSpy).toHaveBeenCalledWith(mockFakeDbCarroModelList()[0].id_carro);
        expect(deleteSpy).toHaveBeenCalledWith(mockFakeDbCarroModelList()[1].id_carro);
        expect(cliente).toBeUndefined();
        const cached = await (await RedisHelper.getClient()).scan(0, { MATCH: `customers::list*` });
        expect(cached.keys).toHaveLength(0);
    });
});

const makeLoadCarroByClienteIdRepository = (): LoadCarroByClienteIdRepository => {
    class LoadCarroByClienteIdRepositoryStub implements LoadCarroByClienteIdRepository {
        async loadByClienteId(id: number): Promise<DbCarroModel[]> {
            return mockFakeDbCarroModelList();
        }
    }
    return new LoadCarroByClienteIdRepositoryStub();
};

const makeDeleteCarroRepository = (): DeleteCarroRepository => {
    class DeleteCarroRepositoryStub implements DeleteCarroRepository {
        async delete(id: number): Promise<void> {
            return;
        }
    }
    return new DeleteCarroRepositoryStub();
};

interface SutTypes {
    sut: DbDeleteCliente;
    deleteClienteRepositoryStub: DeleteClienteRepository;
    loadCarroByClienteRepositoryStub: LoadCarroByClienteIdRepository;
    deleteCarroRepositoryStub: DeleteCarroRepository;
    redisCacheRepositoryStub: RedisCacheRepository;
}

const makeSut = (): SutTypes => {
    const deleteClienteRepositoryStub = makeDeleteClienteRepository();
    const loadCarroByClienteRepositoryStub = makeLoadCarroByClienteIdRepository();
    const deleteCarroRepositoryStub = makeDeleteCarroRepository();
    const redisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbDeleteCliente(
        deleteClienteRepositoryStub,
        loadCarroByClienteRepositoryStub,
        deleteCarroRepositoryStub,
        redisCacheRepositoryStub
    );
    return {
        sut,
        deleteClienteRepositoryStub,
        loadCarroByClienteRepositoryStub,
        deleteCarroRepositoryStub,
        redisCacheRepositoryStub
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
