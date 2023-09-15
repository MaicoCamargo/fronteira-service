import { LoadItensController } from './load-itens-controller';
import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { HttpRequest } from '../../protocols';
import { mockFakeItemModelList } from '../../../../tests/mock/mock-item';
import { ok } from '../../helpers/http';
import { PageFilter } from '../../../main/protocols/page-filter';

describe('LoadItensController', () => {
    test('Deve chamar o LoadItens com os valores corretos', async () => {
        const { sut, loadItensStub } = makeSut();
        const loadSpy = jest.spyOn(loadItensStub, 'load');
        const filter: PageFilter = { page: 1, size: 10 };
        const httpRequest = makeFakeRequest({ query: filter });
        await sut.handle(makeFakeRequest(httpRequest));
        expect(loadSpy).toHaveBeenCalledWith(filter);
    });

    test.skip('Deve retornar uma lista de itens em caso de sucesso', () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest({});
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse).toEqual(ok(mockFakeItemModelList()));
    });
});

interface SutTypes {
    sut: LoadItensController;
    loadItensStub: LoadItens;
}

const makeSut = (): SutTypes => {
    const loadItensStub = makeLoadItens();
    const sut = new LoadItensController(loadItensStub);
    return {
        sut,
        loadItensStub
    };
};

const makeLoadItens = (): LoadItens => {
    class LoadItensStub implements LoadItens {
        async load(): Promise<any> {
            return Promise.resolve(mockFakeItemModelList());
        }
    }
    return new LoadItensStub();
};

const makeFakeRequest = (httpRequest: HttpRequest): HttpRequest => httpRequest;
