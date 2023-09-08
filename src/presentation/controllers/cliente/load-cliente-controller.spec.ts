import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { LoadClienteController } from './load-cliente-controller';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { created, ok, serverError } from '../../helpers/http';
import { makeFakeLoadClienteModelList } from '../../../../tests/mock/mock-cliente';

interface SutTypes {
    sut: LoadClienteController;
    loadClientesStub: LoadClientes;
}

const makeFakeHttpRequest = (): HttpRequest => ({});

const makeLoadCliente = (): LoadClientes => {
    class LoadClienteStub implements LoadClientes {
        async load(): Promise<ClienteModel[]> {
            return makeFakeLoadClienteModelList();
        }
    }
    return new LoadClienteStub();
};
const makeSut = (): SutTypes => {
    const loadClientesStub = makeLoadCliente();
    const sut = new LoadClienteController(loadClientesStub);
    return { sut, loadClientesStub };
};

describe('LoadClienteController', () => {
    test('Deve chamar LoadCliente', async () => {
        const { sut, loadClientesStub } = makeSut();
        const spy = jest.spyOn(loadClientesStub, 'load');
        await sut.handle(makeFakeHttpRequest());
        expect(spy).toBeCalled();
    });
    test('Deve retornar 500 se LoadCliente falhar', async () => {
        const { sut, loadClientesStub } = makeSut();
        jest.spyOn(loadClientesStub, 'load').mockReturnValueOnce(Promise.reject(new Error()));
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
