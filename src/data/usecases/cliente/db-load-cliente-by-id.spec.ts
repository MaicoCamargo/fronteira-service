import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeClienteModel, mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import { DbLoadClienteById } from './db-load-cliente-by-id';

const makeLoadClienteByIdRepositoryStub = () => {
    class LoadClienteByIdRepositoryStub implements LoadClienteByIdRepository {
        loadById(id: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }
    return new LoadClienteByIdRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClienteById;
    loadClienteByIdRepositoryStub: LoadClienteByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadClienteByIdRepositoryStub = makeLoadClienteByIdRepositoryStub();
    const sut = new DbLoadClienteById(loadClienteByIdRepositoryStub);
    return {
        sut,
        loadClienteByIdRepositoryStub
    };
};

describe('DbLoadClienteById', () => {
    test('Deve chamar LoadClienteByIdRepository com id correto', async () => {
        const { sut, loadClienteByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadClienteByIdRepositoryStub, 'loadById');
        await sut.loadById(id);
        expect(loadByIdSpy).toBeCalledWith(id);
    });

    test('Deve retornar null se LoadClienteByIdRepository retornar null', async () => {
        const { sut, loadClienteByIdRepositoryStub } = makeSut();
        jest.spyOn(loadClienteByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
        const id = 1;
        const cliente = await sut.loadById(id);
        expect(cliente).toBeNull();
    });

    test('Deve retornar um cliente se LoadClienteByIdRepository retornar um cliente', async () => {
        const { sut } = makeSut();
        const id = 1;
        const cliente = await sut.loadById(id);
        expect(cliente).toEqual(mockFakeClienteModel());
    });
});
