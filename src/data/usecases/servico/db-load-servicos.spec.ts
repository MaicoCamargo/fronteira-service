import { LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';
import { DbLoadServicos } from './db-load-servicos';
import { mockFakeDbServicoModelList } from '../../../../tests/mock/mock-servico';

describe('DbLoadServicos Use Case', () => {
    test('Deve chamar LoadServicosRepository', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadServicosRepositoryStub, 'load');
        await sut.load();
        expect(loadSpy).toHaveBeenCalled();
    });
});

interface SutTypes {
    sut: DbLoadServicos;
    loadServicosRepositoryStub: LoadServicosRepository;
}
const makeSut = (): SutTypes => {
    const loadServicosRepositoryStub = makeLoadServicosRepository();
    const sut = new DbLoadServicos(loadServicosRepositoryStub);
    return {
        sut,
        loadServicosRepositoryStub
    };
};

const makeLoadServicosRepository = (): LoadServicosRepository => {
    class LoadServicosRepositoryStub implements LoadServicosRepository {
        async load(): Promise<any> {
            return Promise.resolve(mockFakeDbServicoModelList());
        }
    }
    return new LoadServicosRepositoryStub();
};
