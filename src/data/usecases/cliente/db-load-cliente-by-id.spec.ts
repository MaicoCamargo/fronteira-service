import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeClienteModel, mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import { DbLoadClienteById } from './db-load-cliente-by-id';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';

const makeLoadClienteByIdRepositoryStub = () => {
    class LoadClienteByIdRepositoryStub implements LoadClienteByIdRepository {
        loadById(id: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }
    return new LoadClienteByIdRepositoryStub();
};

const makeLoadCarroByIdRepositoryStub = () => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByIdRepository {
        loadById(id: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new LoadCarroByIdRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClienteById;
    loadClienteByIdRepositoryStub: LoadClienteByIdRepository;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadClienteByIdRepositoryStub = makeLoadClienteByIdRepositoryStub();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepositoryStub();
    const sut = new DbLoadClienteById(loadClienteByIdRepositoryStub, loadCarroByIdRepositoryStub);
    return {
        sut,
        loadClienteByIdRepositoryStub,
        loadCarroByIdRepositoryStub
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
