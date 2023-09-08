import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { UpdateClienteController } from './update-cliente-controller';
import { throwError } from '../../../../tests/helper/test-helper';
import { ok, serverError } from '../../helpers/http';
import { mockFakeClienteModel } from '../../../../tests/mock/mock-cliente';

describe('UpdateClienteController', () => {
    test('Deve chamar UpdateCliente com valores corretos', () => {
        const { sut, updateClienteStub } = makeSut();
        const updateSpy = jest.spyOn(updateClienteStub, 'update');
        sut.handle(makeFakeHttpRequest());
        expect(updateSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body);
    });
    test('Deve retornar 500 se UpdateCliente throws', async () => {
        const { sut, updateClienteStub } = makeSut();
        jest.spyOn(updateClienteStub, 'update').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Deve retornar 200 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(ok(mockFakeClienteModel()));
    });
});

interface SutTypes {
    sut: UpdateClienteController;
    updateClienteStub: UpdateCliente;
}

const makeSut = (): SutTypes => {
    const updateClienteStub = makeUpdateCliente();
    const sut = new UpdateClienteController(updateClienteStub);
    return {
        sut,
        updateClienteStub
    };
};

const makeUpdateCliente = (): UpdateCliente => {
    class UpdateClienteStub implements UpdateCliente {
        update(cliente: UpdateClienteParams): Promise<ClienteModel> {
            return Promise.resolve(mockFakeClienteModel());
        }
    }

    return new UpdateClienteStub();
};

const makeFakeHttpRequest = (): HttpRequest => ({
    body: {
        telefone: 'any_telefone',
        nome: 'any_nome',
        cpf: 'any_cpf',
        id: 1
    }
});
