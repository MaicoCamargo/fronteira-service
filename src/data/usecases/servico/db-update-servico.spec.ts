import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { DbUpdateServico } from './db-update-servico';
import { DbServicoModel } from '../../models/db-servico-model';
import { ServicoModel } from '../../../domain/models/servico-model';
import { mockFakeDbServicoModel, mockFakeServicoModel } from '../../../../tests/mock/mock-servico';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { DbIncludedItemModel } from '../../models/db-included-item-model';
import { mockFakeDbIncludedItemModelList } from '../../../../tests/mock/mock-included-itens';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';

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
    loadIncludedItensRepositoryStub: LoadIncludedItensRepository;
    loadClienteByIdServicoRepositoryStub: LoadClienteByIdServicoRepository;
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

const makeLoadIncludedItensRepository = (): LoadIncludedItensRepository => {
    class LoadIncludedItensRepositoryStub implements LoadIncludedItensRepository {
        async load(servicoId: number): Promise<DbIncludedItemModel[]> {
            return mockFakeDbIncludedItemModelList();
        }
    }
    return new LoadIncludedItensRepositoryStub();
};

const makeLoadClienteByIdServicoRepository = (): LoadClienteByIdServicoRepository => {
    class LoadClienteByIdServicoRepositoryStub implements LoadClienteByIdServicoRepository {
        loadByIdServico(servicoId: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }
    return new LoadClienteByIdServicoRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateServicoRepositoryStub = makeUpdateServicoRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const loadIncludedItensRepositoryStub = makeLoadIncludedItensRepository();
    const loadClienteByIdServicoRepositoryStub = makeLoadClienteByIdServicoRepository();

    const sut = new DbUpdateServico(
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadIncludedItensRepositoryStub,
        loadClienteByIdServicoRepositoryStub
    );
    return {
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadIncludedItensRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        sut
    };
};

const makeFakeUpdatedDbServicoModel = (): DbServicoModel => ({ ...mockFakeDbServicoModel(), descricao: 'updated' });

const makeFakeUpdatedServicoModel = (): ServicoModel => ({ ...mockFakeServicoModel(), descricao: 'updated' });
