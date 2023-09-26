import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { DbAddCliente } from './db-add-cliente';
import { throwError } from '../../../../tests/helper/test-helper';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import {
    mockFakeAddClienteModel,
    mockFakeAddClienteParams,
    mockFakeClienteModel,
    mockFakeDbClienteModel
} from '../../../../tests/mock/mock-cliente';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { DbAddEnderecoModel, SaveEnderecoRepository } from '../../protocols/db/endereco/save-endereco-repository';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { mockFakeDbEnderecoModel } from '../../../../tests/mock/mock-endereco';

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

const makeSaveEnderecoRepository = (): SaveEnderecoRepository => {
    class SaveEnderecoRepositoryStub implements SaveEnderecoRepository {
        save(endereco: DbAddEnderecoModel): Promise<DbEnderecoModel> {
            return Promise.resolve(mockFakeDbEnderecoModel());
        }
    }
    return new SaveEnderecoRepositoryStub();
};

interface SutTypes {
    sut: DbAddCliente;
    saveClienteRepositoryStub: SaveClienteRepository;
    saveCarroRepositoryStub: SaveCarroRepository;
    saveEnderecoRepositoryStub: SaveEnderecoRepository;
}

const makeSut = (): SutTypes => {
    const saveClienteRepositoryStub = makeSaveClienteRepository();
    const saveCarroRepositoryStub = makeSaveCarroRepository();
    const saveEnderecoRepositoryStub = makeSaveEnderecoRepository();
    const sut = new DbAddCliente(saveClienteRepositoryStub, saveCarroRepositoryStub, saveEnderecoRepositoryStub);
    return {
        sut,
        saveClienteRepositoryStub,
        saveCarroRepositoryStub,
        saveEnderecoRepositoryStub
    };
};

describe('DbAddCliente Use Case', () => {
    beforeAll(() => {
        mockDateAdapter.set(new Date());
    });

    afterAll(() => {
        mockDateAdapter.reset();
    });

    test('Deve chamar SaveClienteRepository com valores corretos', async () => {
        const { sut, saveClienteRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveClienteRepositoryStub, 'save');
        await sut.add(mockFakeAddClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteModel());
    });

    test('deve lançar exceção se SaveClienteRepository lançar exceção', async () => {
        const { sut, saveClienteRepositoryStub } = makeSut();
        jest.spyOn(saveClienteRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeAddClienteParams());
        await expect(promise).rejects.toThrow();
    });

    test('Deve salvar um novo cliente e retornar em caso de sucesso', async () => {
        const { sut } = makeSut();
        const cliente = await sut.add(mockFakeAddClienteParams());
        expect(cliente.id).toBeTruthy();
        expect(cliente.cpf).toBe(mockFakeAddClienteParams().cpf);
        expect(cliente.nome).toBe(mockFakeAddClienteParams().nome);
        expect(cliente.telefone).toBe(mockFakeAddClienteParams().telefone);
        expect(cliente.carros).toEqual(mockFakeClienteModel().carros);
        expect(cliente.endereco).toEqual(mockFakeClienteModel().endereco);
    });

    test('Deve chamar SaveCarroRepository com valores corretos', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveCarroRepositoryStub, 'save');
        await sut.add(mockFakeAddClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteParams().carros[0], mockFakeDbClienteModel().id_cliente);
    });

    test('Deve chamar SaveEnderecoRepository com valores corretos', async () => {
        const { sut, saveEnderecoRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveEnderecoRepositoryStub, 'save');
        await sut.add(mockFakeAddClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteParams().endereco);
    });
});
