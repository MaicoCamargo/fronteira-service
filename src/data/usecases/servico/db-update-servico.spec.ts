import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { DbUpdateServico } from './db-update-servico';
import { DbServicoModel } from '../../models/db-servico-model';
import { ServicoModel } from '../../../domain/models/servico-model';
import { mockFakeDbServicoModel, mockFakeServicoModel } from '../../../../tests/mock/mock-servico';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { DbIncludedItemModel } from '../../models/db-included-item-model';
import { mockFakeDbIncludedItemModel } from '../../../../tests/mock/mock-included-itens';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import {
    UpdateIncludedItemModel,
    UpdateIncludedItemRepository
} from '../../protocols/db/servico/included-item/update-included-item-repository';

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
    loadClienteByIdServicoRepositoryStub: LoadClienteByIdServicoRepository;
    updateIncludedItemRepositoryStub: UpdateIncludedItemRepository;
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

const makeLoadClienteByIdServicoRepository = (): LoadClienteByIdServicoRepository => {
    class LoadClienteByIdServicoRepositoryStub implements LoadClienteByIdServicoRepository {
        loadByIdServico(servicoId: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }
    return new LoadClienteByIdServicoRepositoryStub();
};

const makeUpdateIncludedItemRepository = (): UpdateIncludedItemRepository => {
    class UpdateIncludedItemRepositoryStub implements UpdateIncludedItemRepository {
        async update(model: UpdateIncludedItemModel): Promise<DbIncludedItemModel> {
            return makeFakeUpdatedDbIncludedItemModel();
        }
    }
    return new UpdateIncludedItemRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateServicoRepositoryStub = makeUpdateServicoRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const loadClienteByIdServicoRepositoryStub = makeLoadClienteByIdServicoRepository();
    const updateIncludedItemRepositoryStub = makeUpdateIncludedItemRepository();

    const sut = new DbUpdateServico(
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub
    );
    return {
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub,
        sut
    };
};

const makeFakeUpdatedDbServicoModel = (): DbServicoModel => ({ ...mockFakeDbServicoModel(), descricao: 'updated' });

const makeFakeUpdatedServicoModel = (): ServicoModel => ({
    ...mockFakeServicoModel(),
    descricao: 'updated',
    itens: [
        {
            nome: makeFakeUpdatedDbIncludedItemModel().nome,
            valor: makeFakeUpdatedDbIncludedItemModel().valor_por_unidade,
            total: makeFakeUpdatedDbIncludedItemModel().valor_total,
            marca: makeFakeUpdatedDbIncludedItemModel().marca,
            id: makeFakeUpdatedDbIncludedItemModel().peca_id,
            quantidade: makeFakeUpdatedDbIncludedItemModel().quantidade
        }
    ]
});

const makeFakeUpdatedDbIncludedItemModel = (): DbIncludedItemModel => ({
    ...mockFakeDbIncludedItemModel(),
    quantidade: 100
});
