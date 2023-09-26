import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { DbAddCliente } from './db-add-cliente';
import { throwError } from '../../../../tests/helper/test-helper';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import {
    mockFakeAddClienteModel,
    mockFakeAddClienteParams,
    mockFakeDbClienteModel
} from '../../../../tests/mock/mock-cliente';
import { mockFakeAddCarroModel, mockFakeAddCarroParams, mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';

const makeSaveClienteRepository = (): SaveClienteRepository => {
    class SaveClienteRepositoryStub implements SaveClienteRepository {
        async save(cliente: AddClienteModel): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new SaveClienteRepositoryStub();
};

const makeSaveCarroRepository = (): SaveCarroRepository => {
    class SaveCarroRepositoryStub implements SaveCarroRepository {
        async save(model: AddCarroModel, clienteId: number): Promise<DbCarroModel> {
            return mockFakeDbCarroModel();
        }
    }
    return new SaveCarroRepositoryStub();
};

interface SutTypes {
    sut: DbAddCliente;
    saveClienteRepositoryStub: SaveClienteRepository;
    saveCarroRepositoryStub: SaveCarroRepository;
}

const makeSut = (): SutTypes => {
    const saveClienteRepositoryStub = makeSaveClienteRepository();
    const saveCarroRepositoryStub = makeSaveCarroRepository();
    const sut = new DbAddCliente(saveClienteRepositoryStub, saveCarroRepositoryStub);
    return {
        sut,
        saveClienteRepositoryStub,
        saveCarroRepositoryStub
    };
};

describe('DbAddCliente Use Case', () => {
    beforeAll(() => {
        mockDateAdapter.set(new Date());
    });

    afterAll(() => {
        mockDateAdapter.reset();
    });

    test('Deve chamar SaveClienteRepository com valores corretos', () => {
        const { sut, saveClienteRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveClienteRepositoryStub, 'save');
        sut.add(mockFakeAddClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteModel());
    });

    test('deve lançar exceção se SaveClienteRepository lançar exceção', async () => {
        const { sut, saveClienteRepositoryStub } = makeSut();
        jest.spyOn(saveClienteRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeAddClienteParams());
        await expect(promise).rejects.toThrow();
    });

    test('deve salvar um novo cliente e retornar em caso de sucesso', async () => {
        const { sut } = makeSut();
        const cliente = await sut.add(mockFakeAddClienteParams());
        expect(cliente.id).toBeTruthy();
        expect(cliente.cpf).toBe(mockFakeAddClienteParams().cpf);
        expect(cliente.nome).toBe(mockFakeAddClienteParams().nome);
        expect(cliente.telefone).toBe(mockFakeAddClienteParams().telefone);
    });

    test('Deve chamar SaveCarroRepository com valores corretos', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveCarroRepositoryStub, 'save');
        await sut.add(mockFakeAddClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteParams().carros[0], mockFakeDbClienteModel().id_cliente);
    });
});
