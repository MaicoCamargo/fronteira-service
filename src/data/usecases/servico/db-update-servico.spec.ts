import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { DbUpdateServico } from './db-update-servico';
import { DbServicoModel } from '../../models/db-servico-model';
import { ServicoModel } from '@/domain/models/servico-model';
import { mockFakeDbServicoModel, mockFakeServicoModel } from '../../../../tests/mock/mock-servico';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { DbIncludedItemModel } from '../../models/db-included-item-model';
import {
    mockFakeDbIncludedItemModel,
    mockFakeDbIncludedItemModelList
} from '../../../../tests/mock/mock-included-itens';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import {
    UpdateIncludedItemModel,
    UpdateIncludedItemRepository
} from '../../protocols/db/servico/included-item/update-included-item-repository';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../protocols/db/servico/included-item/save-included-itens-repository';
import { DeleteIncludedItemRepository } from '../../protocols/db/servico/included-item/delete-included-item-repository';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { UpdateNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/update-nota-fiscal-repository';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { mockFakeDbMechanicModelList, mockFakeMechanicModelList } from '../../../../tests/mock/mock-mechanic';

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

    test('Deve chamar UpdateNotaFiscalRepository com valores corretos', async () => {
        const { sut, updateNotaFiscalRepositoryStub } = makeSut();
        const spy = jest.spyOn(updateNotaFiscalRepositoryStub, 'update');
        await sut.update(makeFakeUpdatedServicoModel());
        expect(spy).toHaveBeenCalledWith(makeFakeUpdatedServicoModel().id, makeFakeUpdatedServicoModel().nota);
    });

    // @TODO criar teste para validar se ocorreu update da nota fiscal
});

interface SutTypes {
    updateServicoRepositoryStub: UpdateServicoRepository;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
    loadClienteByIdServicoRepositoryStub: LoadClienteByIdServicoRepository;
    updateIncludedItemRepositoryStub: UpdateIncludedItemRepository;
    loadIncludedItensRepositoryStub: LoadIncludedItensRepository;
    deleteIncludedItemRepositoryStub: DeleteIncludedItemRepository;
    loadNotaFiscalByIdServicoRepositoryStub: LoadNotaFiscalByIdServicoRepository;
    updateNotaFiscalRepositoryStub: UpdateNotaFiscalRepository;
    loadMechanicsByIdServicoRepositoryStub: LoadMechanicsByIdServicoRepository;
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
        async loadById({ id_carro: number }): Promise<DbCarroModel> {
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

const makeLoadIncludedItensRepository = (): LoadIncludedItensRepository => {
    class LoadIncludedItensRepositoryStub implements LoadIncludedItensRepository {
        async load(servicoId: number): Promise<DbIncludedItemModel[]> {
            return mockFakeDbIncludedItemModelList();
        }
    }
    return new LoadIncludedItensRepositoryStub();
};

const makeSaveIncludedItensRepository = (): SaveIncludedItensRepository => {
    class SaveIncludedItensRepositoryStub implements SaveIncludedItensRepository {
        async save(itens: SaveIncludedItemModel[]): Promise<DbIncludedItemModel[]> {
            return [mockFakeDbIncludedItemModel()];
        }
    }
    return new SaveIncludedItensRepositoryStub();
};

const makeDeleteIncludedItemRepository = (): DeleteIncludedItemRepository => {
    class DeleteIncludedItemRepositoryStub implements DeleteIncludedItemRepository {
        async delete(id: number): Promise<void> {
            return Promise.resolve();
        }
    }
    return new DeleteIncludedItemRepositoryStub();
};

const makeLoadNotaFiscalByIdServicoRepository = (): LoadNotaFiscalByIdServicoRepository => {
    class LoadNotaFiscalByIdServicoRepositoryStub implements LoadNotaFiscalByIdServicoRepository {
        load(idServico: number): Promise<boolean> {
            return Promise.resolve(false);
        }
    }
    return new LoadNotaFiscalByIdServicoRepositoryStub();
};

const makeUpdateNotaFiscalRepository = (): UpdateNotaFiscalRepository => {
    class UpdateNotaFiscalRepositoryStub implements UpdateNotaFiscalRepository {
        update(idServico: number, status: boolean): Promise<boolean> {
            return Promise.resolve(false);
        }
    }
    return new UpdateNotaFiscalRepositoryStub();
};

const makeLoadMechanicsByIdServicoRepository = (): LoadMechanicsByIdServicoRepository => {
    class LoadMechanicsByIdServicoRepositoryStub implements LoadMechanicsByIdServicoRepository {
        async loadByIdServico(servico: number): Promise<Wrapper<DbMechanicModel[]>> {
            return {
                content: mockFakeDbMechanicModelList()
            };
        }
    }
    return new LoadMechanicsByIdServicoRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateServicoRepositoryStub = makeUpdateServicoRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const loadClienteByIdServicoRepositoryStub = makeLoadClienteByIdServicoRepository();
    const updateIncludedItemRepositoryStub = makeUpdateIncludedItemRepository();
    const loadIncludedItensRepositoryStub = makeLoadIncludedItensRepository();
    const saveIncludedItensRepositoryStub = makeSaveIncludedItensRepository();
    const deleteIncludedItemRepositoryStub = makeDeleteIncludedItemRepository();
    const loadNotaFiscalByIdServicoRepositoryStub = makeLoadNotaFiscalByIdServicoRepository();
    const updateNotaFiscalRepositoryStub = makeUpdateNotaFiscalRepository();
    const loadMechanicsByIdServicoRepositoryStub = makeLoadMechanicsByIdServicoRepository();

    const sut = new DbUpdateServico(
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub,
        loadIncludedItensRepositoryStub,
        saveIncludedItensRepositoryStub,
        deleteIncludedItemRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        updateNotaFiscalRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub
    );
    return {
        updateServicoRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub,
        loadIncludedItensRepositoryStub,
        deleteIncludedItemRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        updateNotaFiscalRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub,
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
    ],
    nota: false,
    mecanicos: mockFakeMechanicModelList()
});

const makeFakeUpdatedDbIncludedItemModel = (): DbIncludedItemModel => ({
    ...mockFakeDbIncludedItemModel(),
    quantidade: 100
});
