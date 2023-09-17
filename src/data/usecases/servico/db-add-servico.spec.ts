import { DbAddServico } from './db-add-servico';
import { SaveServicoModel, SaveServicoRepository } from '../../protocols/db/servico/save-servico-repository';
import { DbServicoModel } from '../../models/db-servico-model';
import { mockFakeDbServicoModel, mockFakeServicoModel } from '../../../../tests/mock/mock-servico';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';

describe('DbAddServico Use Case', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        mockDateAdapter.reset();
    });

    test('Deve criar um serviço em caso de sucesso', async () => {
        const { sut } = makeSut();
        const model = await sut.add(mockFakeServicoModel());
        expect(model).toEqual(mockFakeServicoModel());
    });
});

interface SutTypes {
    sut: DbAddServico;
    saveServicoRepositoryStub: SaveServicoRepository;
}

const makeSaveServicoRepository = (): SaveServicoRepository => {
    class AddServicoRepositoryStub implements SaveServicoRepository {
        save(model: SaveServicoModel): Promise<DbServicoModel> {
            return Promise.resolve(mockFakeDbServicoModel());
        }
    }
    return new AddServicoRepositoryStub();
};

const makeSut = (): SutTypes => {
    const saveServicoRepositoryStub = makeSaveServicoRepository();
    const sut = new DbAddServico(saveServicoRepositoryStub);
    return {
        sut,
        saveServicoRepositoryStub
    };
};
