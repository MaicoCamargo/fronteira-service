import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeClienteModel, mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import { DbLoadClienteById } from './db-load-cliente-by-id';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { makeLoadEnderecoByIdRepository } from '../../../../tests/mock/mock-load-endereco-by-id-repository';

const makeLoadClienteByIdRepositoryStub = () => {
    class LoadClienteByIdRepositoryStub implements LoadClienteByIdRepository {
        loadById(id: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }
    return new LoadClienteByIdRepositoryStub();
};

const makeLoadCarroByClienteIdRepositoryStub = (): LoadCarroByClienteIdRepository => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByClienteIdRepository {
        loadByClienteId(id: number): Promise<DbCarroModel[]> {
            return Promise.resolve([mockFakeDbCarroModel()]);
        }
    }
    return new LoadCarroByIdRepositoryStub();
};

interface SutTypes {
    sut: DbLoadClienteById;
    loadClienteByIdRepositoryStub: LoadClienteByIdRepository;
    loadCarroByClienteIdRepositoryStub: LoadCarroByClienteIdRepository;
    loadEnderecoByIdRepositoryStub: LoadEnderecoByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadClienteByIdRepositoryStub = makeLoadClienteByIdRepositoryStub();
    const loadCarroByClienteIdRepositoryStub = makeLoadCarroByClienteIdRepositoryStub();
    const loadEnderecoByIdRepositoryStub = makeLoadEnderecoByIdRepository();
    const sut = new DbLoadClienteById(
        loadClienteByIdRepositoryStub,
        loadCarroByClienteIdRepositoryStub,
        loadEnderecoByIdRepositoryStub
    );
    return {
        sut,
        loadClienteByIdRepositoryStub,
        loadCarroByClienteIdRepositoryStub,
        loadEnderecoByIdRepositoryStub
    };
};

describe('DbLoadClienteById', () => {
    test('Deve chamar LoadCarroByClienteIdRepository com id correto', async () => {
        const { sut, loadClienteByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadClienteByIdRepositoryStub, 'loadById');
        await sut.loadById(id);
        expect(loadByIdSpy).toBeCalledWith(id);
    });

    test('Deve retornar null se LoadCarroByClienteIdRepository retornar null', async () => {
        const { sut, loadClienteByIdRepositoryStub } = makeSut();
        jest.spyOn(loadClienteByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
        const id = 1;
        const cliente = await sut.loadById(id);
        expect(cliente).toBeNull();
    });

    test('Deve retornar um cliente se LoadCarroByClienteIdRepository retornar um cliente', async () => {
        const { sut } = makeSut();
        const id = 1;
        const cliente = await sut.loadById(id);
        expect(cliente).toEqual(mockFakeClienteModel());
    });
});
