import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { mockFakeCarroModel, mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { DbLoadCarroById } from './db-load-carro-by-id';
import { throwError } from '../../../../tests/helper/test-helper';
import { DbCarroModel } from '../../models/db-carro-model';

describe('DbLoadCarroById Usecase', () => {
    test('Deve chamar LoadCarroByIdRepository com valores corretos', async () => {
        const { sut, loadCarroByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadCarroByIdRepositoryStub, 'loadById');
        await sut.loadById(id);
        expect(loadByIdSpy).toBeCalledWith(id);
    });

    test('Deve lançar exceção se LoadCarroByIdRepository lançar exceção', async () => {
        const { sut, loadCarroByIdRepositoryStub } = makeSut();
        jest.spyOn(loadCarroByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.loadById(1);
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar um carro se LoadCarroByIdRepository retornar um carro', async () => {
        const { sut } = makeSut();
        const carro = await sut.loadById(1);
        expect(carro).toEqual(mockFakeCarroModel());
    });
});

interface SutTypes {
    sut: DbLoadCarroById;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
}

const makeSut = (): SutTypes => {
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const sut = new DbLoadCarroById(loadCarroByIdRepositoryStub);
    return {
        sut,
        loadCarroByIdRepositoryStub
    };
};

const makeLoadCarroByIdRepository = (): LoadCarroByIdRepository => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByIdRepository {
        loadById(id: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new LoadCarroByIdRepositoryStub();
};
