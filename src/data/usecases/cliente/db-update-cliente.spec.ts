import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { DbUpdateCliente } from './db-update-cliente';
import { mockFakeUpdateClienteParams } from '../../../../tests/mock/mock-cliente';

interface SutTypes {
    sut: DbUpdateCliente;
    updateClienteRepositoryStub: UpdateClienteRepository;
}

const makeUpdatedDbClienteModel = (): DbClienteModel => ({
    id_cliente: 1,
    nome: 'updated_nome',
    cpf: 'any_cpf',
    telefone: 'updated_telefone',
    endereco_id: 1,
    last_updated: new Date('2021-02-28 00:00:00')
});

const makeUpdatedClienteModel = (): any => ({
    id: 1,
    nome: 'updated_nome',
    cpf: 'any_cpf',
    telefone: 'updated_telefone',
    lastUpdated: new Date('2021-02-28 00:00:00')
});

const makeUpdateClienteRepository = (): UpdateClienteRepository => {
    class UpdateClienteRepositoryStub implements UpdateClienteRepository {
        async update(): Promise<DbClienteModel> {
            return makeUpdatedDbClienteModel();
        }
    }

    return new UpdateClienteRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateClienteRepositoryStub = makeUpdateClienteRepository();
    const sut = new DbUpdateCliente(updateClienteRepositoryStub);
    return {
        sut,
        updateClienteRepositoryStub
    };
};

describe('DbUpdateCliente Use Case', () => {
    test('Deve chamar UpdateClienteRepository com valores corretos', async () => {
        const { sut, updateClienteRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateClienteRepositoryStub, 'update');
        await sut.update(mockFakeUpdateClienteParams());
        expect(updateSpy).toHaveBeenCalledWith({
            id_cliente: mockFakeUpdateClienteParams().id,
            nome: mockFakeUpdateClienteParams().nome,
            telefone: mockFakeUpdateClienteParams().telefone,
            cpf: mockFakeUpdateClienteParams().cpf
        });
    });

    test('Deve lançar exceção se UpdateClienteRepository lançar exceção', async () => {
        const { sut, updateClienteRepositoryStub } = makeSut();
        jest.spyOn(updateClienteRepositoryStub, 'update').mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.update(mockFakeUpdateClienteParams());
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar um cliente atualizado em caso de sucesso', async () => {
        const { sut } = makeSut();
        const wrapper = await sut.update(mockFakeUpdateClienteParams());
        expect(wrapper.content).toEqual(makeUpdatedClienteModel());
    });
});
