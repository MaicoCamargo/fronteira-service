import { DbLoadItensByServico } from './db-load-itens-by-servico';
import { LoadItensByServicoRepository } from '../../protocols/db/item/load-itens-by-servico-repository';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList, mockFakeItemModelList } from '../../../../tests/mock/mock-item';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbLoadItensByServico UseCase', () => {
    test('Deve chamar LoadItensByServicoRepository com valor correto', async () => {
        const { sut, loadItensByServicoRepositoryStub } = makeSut();
        const loadByServicoSpy = jest.spyOn(loadItensByServicoRepositoryStub, 'loadByServico');
        await sut.load(1);
        expect(loadByServicoSpy).toHaveBeenCalledWith(1);
    });

    test('Deve retornar uma lista de itens em caso de sucesso', async () => {
        const { sut } = makeSut();
        const itens = await sut.load(1);
        expect(itens).toEqual(mockFakeItemModelList());
    });

    test('Deve retornar uma lista vazia se LoadItensByServicoRepository retornar uma lista vazia', async () => {
        const { sut, loadItensByServicoRepositoryStub } = makeSut();
        jest.spyOn(loadItensByServicoRepositoryStub, 'loadByServico').mockReturnValueOnce(Promise.resolve([]));
        const itens = await sut.load(1);
        expect(itens).toEqual([]);
    });

    test('Deve lançar exceção se LoadItensByServicoRepository lançar exceção', async () => {
        const { sut, loadItensByServicoRepositoryStub } = makeSut();
        jest.spyOn(loadItensByServicoRepositoryStub, 'loadByServico').mockImplementationOnce(throwError);
        const promise = sut.load(1);
        await expect(promise).rejects.toThrow();
    });
});

interface SutTypes {
    loadItensByServicoRepositoryStub: LoadItensByServicoRepository;
    sut: DbLoadItensByServico;
}

const makeLoadItensByServicoRepository = (): LoadItensByServicoRepository => {
    class LoadItensByServicoRepositoryStub implements LoadItensByServicoRepository {
        loadByServico(servicoId: number): Promise<DbItemModel[]> {
            return Promise.resolve(mockFakeDbItemModelList());
        }
    }
    return new LoadItensByServicoRepositoryStub();
};

const makeSut = (): SutTypes => {
    const loadItensByServicoRepositoryStub = makeLoadItensByServicoRepository();
    const sut = new DbLoadItensByServico(loadItensByServicoRepositoryStub);
    return {
        loadItensByServicoRepositoryStub,
        sut
    };
};
