import { LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';
import { DbLoadServicos } from './db-load-servicos';
import { mockFakeDbServicoModelList, mockFakeServicoModelList } from '../../../../tests/mock/mock-servico';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbServicoModel } from '../../models/db-servico-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbLoadServicos Use Case', () => {
    beforeAll(() => {
        mockDateAdapter.set(new Date());
    });

    afterAll(() => {
        mockDateAdapter.reset();
    });

    test('Deve chamar LoadServicosRepository', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadServicosRepositoryStub, 'load');
        await sut.load();
        expect(loadSpy).toHaveBeenCalled();
    });

    test('Deve retornar uma lista de serviços em caso de sucesso', async () => {
        const { sut } = makeSut();
        const { content: servicos } = await sut.load();
        expect(servicos[0]).toEqual(mockFakeServicoModelList()[0]);
        expect(servicos.length).toEqual(mockFakeServicoModelList().length);
    });

    test('Deve chamar LoadServicosRepository com valores corretos', async () => {
        const pageFilter: PageFilter = { page: 1, size: 10 };
        const { sut, loadServicosRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadServicosRepositoryStub, 'load');
        await sut.load(pageFilter);
        expect(loadSpy).toHaveBeenCalledWith(pageFilter);
    });

    test('Deve lançar exceção de LoadServicosRepository caso ocorra exceção', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        jest.spyOn(loadServicosRepositoryStub, 'load').mockImplementationOnce(throwError);
        const promise = sut.load();
        await expect(promise).rejects.toThrow();
    });
});

interface SutTypes {
    sut: DbLoadServicos;
    loadServicosRepositoryStub: LoadServicosRepository;
}
const makeSut = (): SutTypes => {
    const loadServicosRepositoryStub = makeLoadServicosRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const sut = new DbLoadServicos(loadServicosRepositoryStub, loadCarroByIdRepositoryStub);
    return {
        sut,
        loadServicosRepositoryStub
    };
};

const makeLoadServicosRepository = (): LoadServicosRepository => {
    class LoadServicosRepositoryStub implements LoadServicosRepository {
        async load(pageFilter: PageFilter): Promise<Wrapper<DbServicoModel[]>> {
            const wrapper: Wrapper<DbServicoModel[]> = { content: mockFakeDbServicoModelList() };
            return Promise.resolve(wrapper);
        }
    }
    return new LoadServicosRepositoryStub();
};

const makeLoadCarroByIdRepository = (): LoadCarroByIdRepository => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByIdRepository {
        loadById(id: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new LoadCarroByIdRepositoryStub();
};
