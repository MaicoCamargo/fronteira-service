import { HttpRequest } from '../../protocols';
import { LoadServicosController } from './load-servicos-controller';
import { LoadServicos } from '../../../domain/usecases/servico/load-servicos';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../../domain/models/servico-model';
import { mockFakeServicoModelList } from '../../../../tests/mock/mock-servico';
import { ok } from '../../helpers/http';

describe('LoadServicosController', () => {
    test('Deve Chamar o LoadServicos com os valores corretos', () => {
        const { sut, loadServicosStub } = makeSut();
        const spy = jest.spyOn(loadServicosStub, 'load');
        const pageFilter: PageFilter = { page: 1, size: 10 };
        sut.handle(makeFakeHttpRequest({ query: pageFilter }));
        expect(spy).toHaveBeenCalledWith(pageFilter);
    });

    test('Deve Retornar 200 com os valores corretos', async () => {
        const { sut } = makeSut();
        const pageFilter: PageFilter = { page: 1, size: 10 };
        const httpResponse = await sut.handle(makeFakeHttpRequest({ query: pageFilter }));
        const payload = {
            content: mockFakeServicoModelList(),
            pagination: makePagination(pageFilter, mockFakeServicoModelList().length)
        };
        expect(httpResponse).toEqual(ok(payload));
    });
});

interface SutTypes {
    sut: LoadServicosController;
    loadServicosStub: LoadServicos;
}

const makeLoadServicos = (): LoadServicos => {
    class LoadServicosStub implements LoadServicos {
        async load(pageFilter?: PageFilter): Promise<Wrapper<ServicoModel[]>> {
            return {
                content: mockFakeServicoModelList(),
                pagination: makePagination(pageFilter, mockFakeServicoModelList().length)
            };
        }
    }
    return new LoadServicosStub();
};

const makeSut = (): SutTypes => {
    const loadServicosStub = makeLoadServicos();
    const sut = new LoadServicosController(loadServicosStub);
    return { sut, loadServicosStub };
};

const makeFakeHttpRequest = (httpRequest?: HttpRequest): HttpRequest => httpRequest;

const makePagination = (pageFilter: PageFilter, total) => ({
    from: 0,
    to: 2,
    lastPage: 1,
    prevPage: null,
    nextPage: null,
    currentPage: pageFilter.page,
    perPage: pageFilter.size,
    total,
    totalItemPage: total.length
});
