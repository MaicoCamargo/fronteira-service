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

const makeSaveClienteRepository = (): SaveClienteRepository => {
    class SaveClienteRepositoryStub implements SaveClienteRepository {
        async save(cliente: AddClienteModel): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new SaveClienteRepositoryStub();
};

const makeSaveCarroRepository = (): SaveClienteRepository => {
    class SaveCarroRepositoryStub implements SaveClienteRepository {
        async save(cliente: AddClienteModel): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new SaveCarroRepositoryStub();
};

interface SutTypes {
    sut: DbAddCliente;
    saveClienteRepositoryStub: SaveClienteRepository;
}
const makeSut = (): SutTypes => {
    const saveClienteRepositoryStub = makeSaveClienteRepository();
    const saveCarroRepositoryStub = makeSaveCarroRepository();
    const sut = new DbAddCliente(saveClienteRepositoryStub);
    return {
        sut,
        saveClienteRepositoryStub
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
});
