import { HttpRequest } from '../../protocols';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { SaveClienteController } from './save-cliente-controller';
import { created, serverError } from '../../helpers/http';
import { mockFakeAddClienteParams, mockFakeClienteModel } from '../../../../tests/mock/mock-cliente';
import { throwError } from '../../../../tests/helper/test-helper';

interface SutTypes {
    sut: SaveClienteController;
    addClienteStub: AddCliente;
}

const makeFakeHttpRequest = (): HttpRequest => ({
    body: { ...mockFakeAddClienteParams() }
});

const makeSaveCliente = (): AddCliente => {
    class AddClienteStub implements AddCliente {
        async add(params: AddClienteParams): Promise<ClienteModel> {
            return mockFakeClienteModel();
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
        expect(httpResponse).toEqual(created(mockFakeClienteModel()));
    });

    test('Deve retornar 500 se AddCliente falhar', async () => {
        const { sut, addClienteStub } = makeSut();
        jest.spyOn(addClienteStub, 'add').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
