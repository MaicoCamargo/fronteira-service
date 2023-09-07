import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { DbAddCliente } from './db-add-cliente';
import { throwError } from '../../../domain/helper/test-helper';
import { DbClienteModel } from '../../models/db-cliente-model';
import { AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';

const mockFakeClienteParams = (): AddClienteParams => ({
    cpf: 'any_cpf',
    nome: 'any_nome',
    telefone: 'any_telefone',
    carro: 1,
    endereco: 1
});

const mockFakeAddClienteModel = (): AddClienteModel => ({
    cpf: 'any_cpf',
    carro_id: 1,
    nome: 'any_nome',
    endereco_id: 1,
    last_updated: new Date(),
    telefone: 'any_telefone'
});

const mockFakeDbClienteModel = (): DbClienteModel => ({
    id_cliente: 1,
    ...mockFakeAddClienteModel()
});

const makeSaveClienteRepository = (): SaveClienteRepository => {
    class SaveClienteRepositoryStub implements SaveClienteRepository {
        async save(cliente: AddClienteModel): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new SaveClienteRepositoryStub();
};

interface SutTypes {
    sut: DbAddCliente;
    saveClienteRepositoryStub: SaveClienteRepository;
}
const makeSut = (): SutTypes => {
    const saveClienteRepositoryStub = makeSaveClienteRepository();
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

    test('deve chamar SaveClienteRepository com valores corretos', () => {
        const { sut, saveClienteRepositoryStub } = makeSut();

        const saveSpy = jest.spyOn(saveClienteRepositoryStub, 'save');
        sut.add(mockFakeClienteParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeAddClienteModel());
    });

    test('deve lançar exceção se SaveClienteRepository lançar exceção', async () => {
        const { sut, saveClienteRepositoryStub } = makeSut();
        jest.spyOn(saveClienteRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeClienteParams());
        await expect(promise).rejects.toThrow();
    });

    test('deve salvar um novo cliente e retornar em caso de sucesso', async () => {
        const { sut } = makeSut();
        const cliente = await sut.add(mockFakeClienteParams());
        expect(cliente.id).toBeTruthy();
        expect(cliente.cpf).toBe(mockFakeClienteParams().cpf);
        expect(cliente.nome).toBe(mockFakeClienteParams().nome);
        expect(cliente.telefone).toBe(mockFakeClienteParams().telefone);
        expect(cliente.endereco).toBe(mockFakeClienteParams().endereco);
        expect(cliente.carro).toBe(mockFakeClienteParams().carro);
    });
});
