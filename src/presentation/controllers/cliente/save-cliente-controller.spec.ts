import { HttpRequest } from '../../protocols';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { SaveClienteController } from './save-cliente-controller';
import { created, serverError } from '../../helpers/http';

interface SutTypes {
    sut: SaveClienteController;
    addClienteStub: AddCliente;
}

const makeFakeAddClienteParams = (): AddClienteParams => ({
    nome: 'any_name',
    cpf: 'any_cpf',
    endereco: 1,
    telefone: 'any_telefone',
    carro: 1
});

const makeFakeHttpRequest = (): HttpRequest => ({
    body: { ...makeFakeAddClienteParams() }
});

const makeFakeClienteModel = (): ClienteModel => ({
    nome: 'any_name',
    cpf: 'any_cpf',
    endereco: 1,
    telefone: 'any_telefone',
    carro: 1,
    id: 1,
    lastUpdated: new Date('2023-01-01')
});

const makeSaveCliente = (): AddCliente => {
    class AddClienteStub implements AddCliente {
        async add(params: AddClienteParams): Promise<ClienteModel> {
            return makeFakeClienteModel();
        }
    }
    return new AddClienteStub();
};

const makeSut = (): SutTypes => {
    const addClienteStub = makeSaveCliente();
    const sut = new SaveClienteController(addClienteStub);
    return { sut, addClienteStub };
};

describe('SaveClienteController', () => {
    test('Deve chamar AddCliente com os valores corretos', async () => {
        const { sut, addClienteStub } = makeSut();
        const spy = jest.spyOn(addClienteStub, 'add');
        await sut.handle(makeFakeHttpRequest());
        expect(spy).toHaveBeenCalledWith(makeFakeHttpRequest().body);
    });

    test('Deve retornar 201 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(created(makeFakeClienteModel()));
    });

    test('Deve retornar 500 se AddCliente falhar', async () => {
        const { sut, addClienteStub } = makeSut();
        jest.spyOn(addClienteStub, 'add').mockReturnValueOnce(Promise.reject(new Error()));
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
