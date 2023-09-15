import { LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { DbLoadItens } from './db-load-itens';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList } from '../../../../tests/mock/mock-item';

describe('DbLoadItens Use Case', () => {
    test('Deve chamar LoadItensRepository', async () => {
        const { sut, loadItensRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadItensRepositoryStub, 'load');
        await sut.load();
        expect(loadSpy).toHaveBeenCalled();
    });
});

interface SutTypes {
    loadItensRepositoryStub: LoadItensRepository;
    sut: DbLoadItens;
}

const makeSut = (): SutTypes => {
    const loadItensRepositoryStub = makeLoadItensRepository();
    const sut = new DbLoadItens(loadItensRepositoryStub);
    return {
        loadItensRepositoryStub,
        sut
    };
};

const makeLoadItensRepository = (): LoadItensRepository => {
    class LoadItensRepositoryStub implements LoadItensRepository {
        async load(): Promise<DbItemModel[]> {
            return Promise.resolve(mockFakeDbItemModelList());
        }
    }
    return new LoadItensRepositoryStub();
};
