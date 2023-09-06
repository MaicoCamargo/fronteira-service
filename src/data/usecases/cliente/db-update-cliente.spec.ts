import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { DbUpdateCliente } from './db-update-cliente';
import { mockFakeDbClienteModel, mockFakeUpdateClienteParams } from '../../../../tests/mock/mock-cliente';

interface SutTypes {
    sut: DbUpdateCliente;
    updateClienteRepositoryStub: UpdateClienteRepository;
}

const makeUpdateClienteRepository = (): UpdateClienteRepository => {
    class UpdateClienteRepositoryStub implements UpdateClienteRepository {
        async update(): Promise<DbClienteModel> {
            return mockFakeDbClienteModel();
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

describe('DbUpdateCliente Usecase', () => {
    test('Deve chamar UpdateClienteRepository com valores corretos', async () => {
        const { sut, updateClienteRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateClienteRepositoryStub, 'update');
        await sut.update(mockFakeUpdateClienteParams());
        expect(updateSpy).toHaveBeenCalledWith(mockFakeUpdateClienteParams());
    });
});
