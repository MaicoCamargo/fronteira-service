import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { mockFakeCarroModel } from '../../../../tests/mock/mock-carro';
import { DbLoadCarroById } from './db-load-carro-by-id';
import { throwError } from '../../../../tests/helper/test-helper';

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
        loadById(id: number): Promise<CarroModel> {
            return Promise.resolve(mockFakeCarroModel());
        }
    }
    return new LoadCarroByIdRepositoryStub();
};
