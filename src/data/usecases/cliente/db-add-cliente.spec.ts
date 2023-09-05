import { AddClienteModel, AddClienteRepository } from '../../protocols/db/cliente/add-cliente-repository';
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

const makeAddClienteRepository = (): AddClienteRepository => {
    class AddClienteRepositoryStub implements AddClienteRepository {
        async save(cliente: AddClienteModel): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new AddClienteRepositoryStub();
};

interface SutTypes {
    sut: DbAddCliente;
    addClienteRepositoryStub: AddClienteRepository;
}
const makeSut = (): SutTypes => {
    const addClienteRepositoryStub = makeAddClienteRepository();
    const sut = new DbAddCliente(addClienteRepositoryStub);
    return {
        sut,
        addClienteRepositoryStub
    };
};

describe('DbAddCliente Use Case', () => {
    beforeAll(() => {
        mockDateAdapter.set(new Date());
    });

    afterAll(() => {
        mockDateAdapter.reset();
    });

    test('deve chamar AddClienteRepository com valores corretos', () => {
        const { sut, addClienteRepositoryStub } = makeSut();

        const addSpy = jest.spyOn(addClienteRepositoryStub, 'save');
        sut.add(mockFakeClienteParams());
        expect(addSpy).toHaveBeenCalledWith(mockFakeAddClienteModel());
    });

    test('deve lançar exceção se AddClienteRepository lançar exceção', async () => {
        const { sut, addClienteRepositoryStub } = makeSut();
        jest.spyOn(addClienteRepositoryStub, 'save').mockImplementationOnce(throwError);
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
