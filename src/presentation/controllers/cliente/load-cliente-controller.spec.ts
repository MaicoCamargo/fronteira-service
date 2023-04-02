import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { LoadClienteController } from './load-cliente-controller';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { created, ok, serverError } from '../../helpers/http';

interface SutTypes {
    sut: LoadClienteController;
    loadClientesStub: LoadClientes;
}

const makeFakeHttpRequest = (): HttpRequest => ({});

const makeFakeClientes = (): ClienteModel[] => [
    {
        nome: 'any_name',
        cpf: 'any_cpf',
        endereco: 'any_endereco',
        id: 1,
        telefone: 'any_telefone',
        carro: 'any_carro',
        lastUpdated: new Date('2023-01-01')
    },
    {
        nome: 'other_name',
        cpf: 'other_cpf',
        endereco: 'other_endereco',
        id: 1,
        telefone: 'other_telefone',
        carro: 'other_carro',
        lastUpdated: new Date('2023-01-01')
    }
];

const makeLoadCliente = (): LoadClientes => {
    class LoadClienteStub implements LoadClientes {
        async load(): Promise<ClienteModel[]> {
            return await makeFakeClientes();
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
