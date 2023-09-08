import { DbLoadEnderecoById } from './db-load-endereco-by-id';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { mockFakeDbEnderecoModel } from '../../../../tests/mock/mock-endereco';

describe('DbLoadEnderecoById Use Case', () => {
    test('Deve chamar LoadEnderecoByIdRepository com valores corretos', () => {
        const { sut, loadEnderecoByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById');
        sut.loadById(id);
        expect(loadByIdSpy).toHaveBeenCalledWith(id);
    });
});

const makeLoadEnderecoByIdRepository = (): any => {
    class LoadEnderecoByIdRepositoryStub implements LoadEnderecoByIdRepository {
        loadById(id: number): Promise<DbEnderecoModel> {
            return Promise.resolve(mockFakeDbEnderecoModel());
        }
    }
    return new LoadEnderecoByIdRepositoryStub();
};

interface SutTypes {
    sut: DbLoadEnderecoById;
    loadEnderecoByIdRepositoryStub: LoadEnderecoByIdRepository;
}
const makeSut = (): SutTypes => {
    const loadEnderecoByIdRepositoryStub = makeLoadEnderecoByIdRepository();
    const sut = new DbLoadEnderecoById(loadEnderecoByIdRepositoryStub);
    return {
        sut,
        loadEnderecoByIdRepositoryStub
    };
};
