import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { DbUpdateServico } from './db-update-servico';
import { DbServicoModel } from '../../models/db-servico-model';
import { ServicoModel } from '../../../domain/models/servico-model';
import { mockFakeDbServicoModel, mockFakeServicoModel } from '../../../../tests/mock/mock-servico';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { LoadItensByServicoRepository } from '../../protocols/db/item/load-itens-by-servico-repository';
import { DbItemModel } from '../../models/db-item-model';
import { mockFakeDbItemModelList } from '../../../../tests/mock/mock-item';

describe('DbUpdateServico Use Case', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        mockDateAdapter.reset();
    });

    test('Deve editar um servico em caso de sucesso', async () => {
        const { sut } = makeSut();
        const promise = await sut.update(makeFakeUpdatedServicoModel());
        expect(promise).toEqual(makeFakeUpdatedServicoModel());
    });
});

interface SutTypes {
    updateServicoRepositoryStub: UpdateServicoRepository;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
    loadItensByServicoRepositoryStub: LoadItensByServicoRepository;
    sut: DbUpdateServico;
}

const makeUpdateServicoRepository = (): UpdateServicoRepository => {
    class UpdateServicoRepositoryStub implements UpdateServicoRepository {
        async update(model: UpdateServicoModel): Promise<DbServicoModel> {
            return Promise.resolve(makeFakeUpdatedDbServicoModel());
        }
    }
    return new UpdateServicoRepositoryStub();
};

const makeLoadCarroByIdRepository = (): LoadCarroByIdRepository => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByIdRepository {
        async loadById(id: number): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new LoadCarroByIdRepositoryStub();
};

const makeLoadItensByServicoRepository = (): LoadItensByServicoRepository => {
    class LoadItensByServicoRepositoryStub implements LoadItensByServicoRepository {
        async loadByServico(servicoId: number): Promise<DbItemModel[]> {
            return mockFakeDbItemModelList();
        }
    }
    return new LoadItensByServicoRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateServicoRepositoryStub = makeUpdateServicoRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const loadItensByServicoRepositoryStub = makeLoadItensByServicoRepository();

    const sut = new DbUpdateServico(
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadItensByServicoRepositoryStub
    );
    return {
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadItensByServicoRepositoryStub,
        sut
    };
};

const makeFakeUpdatedDbServicoModel = (): DbServicoModel => ({ ...mockFakeDbServicoModel(), descricao: 'updated' });

const makeFakeUpdatedServicoModel = (): ServicoModel => ({ ...mockFakeServicoModel(), descricao: 'updated' });
