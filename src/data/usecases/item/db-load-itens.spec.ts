import { DbItemsDbFilter, LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { DbLoadItens } from './db-load-itens';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList, mockFakeItemModelList } from '../../../../tests/mock/mock-item';
import { PageFilter } from '@/main/protocols/page-filter';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { throwError } from '../../../../tests/helper/test-helper';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';
import { RedisHelper } from '@/infra/db/redis/helpers/redis-helper';
import { Filter } from '@/main/protocols/filter';

describe('DbLoadItens Use Case', () => {
    beforeEach(async () => {
        await RedisHelper.cleanAll();
    });

    afterAll(async () => {
        await RedisHelper.disconnect();
    });

    test('Deve chamar LoadItensRepository', async () => {
        const { sut, loadItensRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadItensRepositoryStub, 'load');
        await sut.load();
        expect(loadSpy).toHaveBeenCalled();
    });

    test('Deve retornar uma lista de itens em caso de sucesso', async () => {
        const { sut } = makeSut();
        const itens = (await sut.load()).content;
        expect(itens).toEqual(mockFakeItemModelList());
    });

    test('Deve lançar uma exceção se LoadItensRepository lançar uma exceção', async () => {
        const { sut, loadItensRepositoryStub } = makeSut();
        jest.spyOn(loadItensRepositoryStub, 'load').mockImplementationOnce(throwError);
        const promise = sut.load();
        await expect(promise).rejects.toThrow();
    });
});

interface SutTypes {
    loadItensRepositoryStub: LoadItensRepository;
    sut: DbLoadItens;
}

const makeSut = (): SutTypes => {
    const loadItensRepositoryStub = makeLoadItensRepository();
    const makeRedisCacheRepositoryStub = makeRedisCacheRepository();
    const sut = new DbLoadItens(loadItensRepositoryStub, makeRedisCacheRepositoryStub, makeRedisCacheRepositoryStub);
    return {
        loadItensRepositoryStub,
        sut
    };
};

const makeLoadItensRepository = (): LoadItensRepository => {
    class LoadItensRepositoryStub implements LoadItensRepository {
        load(filters?: Filter<DbItemsDbFilter>): Promise<Wrapper<DbItemModel[]>> {
            return Promise.resolve({ content: mockFakeDbItemModelList() });
        }
    }
    return new LoadItensRepositoryStub();
};

const makeRedisCacheRepository = (): RedisCacheRepository => {
    return new RedisCacheRepository();
};
