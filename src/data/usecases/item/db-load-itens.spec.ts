import { LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { DbLoadItens } from './db-load-itens';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList, mockFakeItemModelList } from '../../../../tests/mock/mock-item';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';

describe('DbLoadItens Use Case', () => {
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
        load(pageFilter?: PageFilter): Promise<Wrapper<DbItemModel[]>> {
            return Promise.resolve({ content: mockFakeDbItemModelList() });
        }
    }
    return new LoadItensRepositoryStub();
};
