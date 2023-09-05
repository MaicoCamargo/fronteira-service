import { HttpRequest } from '../../protocols';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { SaveClienteController } from './save-cliente-controller';

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
});
