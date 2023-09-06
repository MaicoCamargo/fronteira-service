import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { HttpRequest } from '../../protocols';
import { UpdateClienteController } from './update-cliente-controller';

describe('UpdateClienteController', () => {
    test('Deve chamar UpdateCliente com valores corretos', () => {
        const { sut, updateClienteStub } = makeSut();
        const updateSpy = jest.spyOn(updateClienteStub, 'update');
        sut.handle(makeFakeHttpRequest());
        expect(updateSpy).toHaveBeenCalledWith(makeFakeHttpRequest().body);
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
