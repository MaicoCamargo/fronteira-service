import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { mockFakeCarroModel } from '../../../../tests/mock/mock-carro';
import { DbLoadCarroById } from './db-load-carro-by-id';

describe('DbLoadCarroById Usecase', () => {
    test('Deve chamar LoadCarroByIdRepository com valores corretos', async () => {
        const { sut, loadCarroByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadCarroByIdRepositoryStub, 'loadById');
        await sut.loadById(id);
        expect(loadByIdSpy).toBeCalledWith(id);
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
