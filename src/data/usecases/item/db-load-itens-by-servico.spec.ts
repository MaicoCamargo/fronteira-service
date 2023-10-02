import { DbLoadItensByServico } from './db-load-itens-by-servico';
import { LoadItensByServicoRepository } from '../../protocols/db/item/load-itens-by-servico-repository';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList } from '../../../../tests/mock/mock-item';

describe('DbLoadItensByServico UseCase', () => {
    test('Deve chamar LoadItensByServicoRepository com valor correto', async () => {
        const { sut, loadItensByServicoRepositoryStub } = makeSut();
        const loadByServicoSpy = jest.spyOn(loadItensByServicoRepositoryStub, 'loadByServico');
        await sut.load(1);
        expect(loadByServicoSpy).toHaveBeenCalledWith(1);
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
