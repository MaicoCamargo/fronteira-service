import { DbLoadEnderecoById } from './db-load-endereco-by-id';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { DbEnderecoModel } from '../../models/db-endereco-model';
import { mockFakeDbEnderecoModel } from '../../../../tests/mock/mock-endereco';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbLoadEnderecoById Use Case', () => {
    test('Deve chamar LoadEnderecoByIdRepository com valores corretos', () => {
        const { sut, loadEnderecoByIdRepositoryStub } = makeSut();
        const id = 1;
        const loadByIdSpy = jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById');
        sut.loadById(id);
        expect(loadByIdSpy).toHaveBeenCalledWith(id);
    });

    test('Deve lançar exceção se LoadEnderecoByIdRepository lançar exceção', async () => {
        const { sut, loadEnderecoByIdRepositoryStub } = makeSut();
        jest.spyOn(loadEnderecoByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
        const promise = sut.loadById(1);
        await expect(promise).rejects.toThrow();
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
