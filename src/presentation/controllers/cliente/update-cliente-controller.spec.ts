import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { UpdateClienteController } from './update-cliente-controller';
import { throwError } from '../../../domain/helper/test-helper';
import { serverError } from '../../helpers/http';

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
            return Promise.resolve(makeFakeUpdatedClienteModel());
        }
    }

    return new UpdateClienteStub();
};

const makeFakeUpdatedClienteModel = (): ClienteModel => ({
    telefone: 'any_telefone',
    nome: 'updated_nome',
    lastUpdated: new Date(),
    cpf: 'any_cpf',
    endereco: 1,
    carro: 1,
    id: 1
});

const makeFakeHttpRequest = (): HttpRequest => ({
    body: {
        telefone: 'any_telefone',
        nome: 'any_nome',
        cpf: 'any_cpf',
        id: 1
    }
});
