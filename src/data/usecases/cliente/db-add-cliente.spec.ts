import { AddClienteParams, AddClienteRepository } from '../../protocols/db/cliente/add-cliente-repository';
import { DbAddCliente } from './db-add-cliente';
import { throwError } from '../../../domain/helper/test-helper';

const mockFakeClienteParams = (): AddClienteParams => ({
    cpf: 'any_cpf',
    carro_id: 1,
    nome: 'any_nome',
    endereco_id: 1,
    telefone: 'any_telefone'
});

const makeAddClienteRepository = (): AddClienteRepository => {
    class AddClienteRepositoryStub implements AddClienteRepository {
        async add(cliente: AddClienteParams): Promise<any> {
            return Promise.resolve({
                id_cliente: 1,
                cpf: 'any_cpf',
                carro_id: 1,
                nome: 'any_nome',
                endereco_id: 1,
                last_updated: new Date('2022-01-01'),
                telefone: 'any_telefone'
            });
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
    test('deve chamar AddClienteRepository com valores corretos', () => {
        const { sut } = makeSut();

        const addSpy = jest.spyOn(sut, 'add');
        sut.add(mockFakeClienteParams());
        expect(addSpy).toHaveBeenCalledWith(mockFakeClienteParams());
    });

    test('deve lançar exceção se AddClienteRepository lançar exceção', async () => {
        const { sut, addClienteRepositoryStub } = makeSut();
        jest.spyOn(addClienteRepositoryStub, 'add').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeClienteParams());
        await expect(promise).rejects.toThrow();
    });
});
