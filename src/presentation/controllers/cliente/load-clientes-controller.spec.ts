import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { LoadClientesController } from './load-clientes-controller';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { serverError } from '../../helpers/http';
import { makeFakeLoadClienteModelList } from '../../../../tests/mock/mock-cliente';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { throwError } from '../../../../tests/helper/test-helper';
import { PageFilter } from '../../../main/protocols/page-filter';

interface SutTypes {
    sut: LoadClientesController;
    loadClientesStub: LoadClientes;
}

const makeFakeHttpRequest = (): HttpRequest => ({});

const makeLoadCliente = (): LoadClientes => {
    class LoadClienteStub implements LoadClientes {
        async load(pageFilter: PageFilter): Promise<Wrapper<ClienteModel[]>> {
            return { content: makeFakeLoadClienteModelList() };
        }
    }
    return new LoadClienteStub();
};
const makeSut = (): SutTypes => {
    const loadClientesStub = makeLoadCliente();
    const sut = new LoadClientesController(loadClientesStub);
    return { sut, loadClientesStub };
};

describe('LoadClientesController', () => {
    test('Deve chamar LoadCliente', async () => {
        const { sut, loadClientesStub } = makeSut();
        const spy = jest.spyOn(loadClientesStub, 'load');
        await sut.handle(makeFakeHttpRequest());
        expect(spy).toBeCalled();
    });
    test('Deve retornar 500 se LoadCliente falhar', async () => {
        const { sut, loadClientesStub } = makeSut();
        jest.spyOn(loadClientesStub, 'load').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
