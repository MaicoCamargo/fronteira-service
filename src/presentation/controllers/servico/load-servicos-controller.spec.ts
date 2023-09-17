import { HttpRequest } from '../../protocols';
import { LoadServicosController } from './load-servicos-controller';
import { LoadServicos } from '../../../domain/usecases/servico/load-servicos';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../../domain/models/servico-model';
import { mockFakeServicoModelList } from '../../../../tests/mock/mock-servico';

describe('LoadServicosController', () => {
    test('Deve Chamar o LoadServicos com os valores corretos', () => {
        const { sut, loadServicosStub } = makeSut();
        const spy = jest.spyOn(loadServicosStub, 'load');
        const pageFilter: PageFilter = { page: 1, size: 10 };
        sut.handle(makeFakeHttpRequest({ query: pageFilter }));
        expect(spy).toHaveBeenCalledWith(pageFilter);
    });
});

interface SutTypes {
    sut: LoadServicosController;
    loadServicosStub: LoadServicos;
}

const makeLoadServicos = (): LoadServicos => {
    class LoadServicosStub implements LoadServicos {
        async load(pageFilter?: PageFilter): Promise<Wrapper<ServicoModel[]>> {
            return Promise.resolve({ content: mockFakeServicoModelList() });
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
