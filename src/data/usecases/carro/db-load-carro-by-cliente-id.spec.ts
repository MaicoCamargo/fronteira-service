import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { DbLoadCarroByClienteId } from './db-load-carro-by-cliente-id';
import { mockFakeCarroModelList } from '../../../../tests/mock/mock-carro';
import { throwError } from '../../../../tests/helper/test-helper';
import { makeLoadCarroByClienteIdRepository } from '../../../../tests/mock/mock-load-carro-by-cliente-id-repository';

describe('DbLoadCarroByClienteId Use Case', () => {
    test('Deve chamar o LoadCarroByClienteIdRepository com o id correto', async () => {
        const { sut, loadCarroByClienteIdRepositoryStub } = makeSut();
        const loadByClienteIdSpy = jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId');
        const id = 1;
        await sut.loadByClienteId(id);
        expect(loadByClienteIdSpy).toHaveBeenCalledWith(id);
    });

    test('Deve retornar uma lista de carros em caso de sucesso', async () => {
        const { sut } = makeSut();
        const id = 1;
        const carros = await sut.loadByClienteId(id);
        expect(carros).toEqual(mockFakeCarroModelList());
    });

    test('Deve lançar uma exceção se o LoadCarroByClienteIdRepository lançar uma exceção', async () => {
        const { sut, loadCarroByClienteIdRepositoryStub } = makeSut();
        jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId').mockImplementationOnce(throwError);
        const id = 1;
        const promise = sut.loadByClienteId(id);
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar uma lista vazia se o LoadCarroByClienteIdRepository retornar uma lista vazia', async () => {
        const { sut, loadCarroByClienteIdRepositoryStub } = makeSut();
        jest.spyOn(loadCarroByClienteIdRepositoryStub, 'loadByClienteId').mockReturnValue(Promise.resolve(await []));
        const id = 1;
        const carros = await sut.loadByClienteId(id);
        expect(carros).toEqual([]);
    });
});

interface SutTypes {
    sut: DbLoadCarroByClienteId;
    loadCarroByClienteIdRepositoryStub: LoadCarroByClienteIdRepository;
}

const makeSut = (): SutTypes => {
    const loadCarroByClienteIdRepositoryStub = makeLoadCarroByClienteIdRepository();
    const sut = new DbLoadCarroByClienteId(loadCarroByClienteIdRepositoryStub);
    return { sut, loadCarroByClienteIdRepositoryStub };
};
