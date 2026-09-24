import { DbLoadEnderecoById } from './db-load-endereco-by-id';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { mockFakeDbEnderecoModel, makeFakeEnderecoModel } from '../../../../tests/mock/mock-endereco';
import { throwError } from '../../../../tests/helper/test-helper';
import { makeLoadEnderecoByIdRepository } from '../../../../tests/mock/mock-load-endereco-by-id-repository';

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

    test('Deve retornar um endereço se LoadEnderecoByIdRepository retornar um endereço', async () => {
        const { sut } = makeSut();
        const endereco = await sut.loadById(mockFakeDbEnderecoModel().id_endereco);
        expect(endereco).toEqual(makeFakeEnderecoModel());
    });
});

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
