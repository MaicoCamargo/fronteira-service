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
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { mockFakeDbMechanicModelList, mockFakeMechanicModelList } from '../../../../tests/mock/mock-mechanic';
import { UpdateServiceMechanicsRepository } from '@/data/protocols/db/mechanic/update-service-mechanics-repository';
import { AddMechanicsModel } from '@/data/protocols/db/mechanic/save-service-mechanics-repository';
import { UpdateCarroModel, UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';
import { CancelBillingIntegration } from '@/data/protocols/client/billing-service/cancel-billing-integration';
import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import {
    LoadAuthDetailIntegration,
    LoadAuthDetailIntegrationModel
} from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { makeLoadAuthDetailIntegrationModel } from '../../../../tests/mock/mock-load-auth-detail-integration';
import { DbProfileModel } from '@/data/models/db-profile-model';
import { mockFakeDbProfileModel } from '../../../../tests/mock/mock-profile';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { makeIntegrationLoadSimpleBillingModel } from '../../../../tests/mock/mock-integration-load-simple-billing-model';
import { mockSpyHttpRequestScopeAuthorization } from '../../../../tests/mock/mock-http-request-scope';

describe('DbUpdateServico Use Case', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
        mockSpyHttpRequestScopeAuthorization();
    });

    afterAll(async () => {
        mockDateAdapter.reset();
    });

    test('Deve editar um servico em caso de sucesso', async () => {
        const { sut } = makeSut();
        const servico = await sut.update(makeFakeUpdatedServicoModel());
        const servicoQuilometragemCarroUpdated = {
            ...servico,
            carro: { ...servico.carro, quilometragem: servico.quilometragem }
        };
        expect(servico).toEqual(servicoQuilometragemCarroUpdated);
    });

    test('Deve chamar UpdateNotaFiscalRepository com valores corretos', async () => {
        const { sut, updateNotaFiscalRepositoryStub } = makeSut();
        const spy = jest.spyOn(updateNotaFiscalRepositoryStub, 'update');
        await sut.update(makeFakeUpdatedServicoModel());
        expect(spy).toHaveBeenCalledWith(makeFakeUpdatedServicoModel().id, makeFakeUpdatedServicoModel().nota);
    });

    test('Deve chamar UpdateCarroRepository com valores corretos', async () => {
        const { sut, updateCarroRepositoryStub } = makeSut();
        const spy = jest.spyOn(updateCarroRepositoryStub, 'update');
        await sut.update(makeFakeUpdatedServicoModel());
        expect(spy).toHaveBeenCalledWith({
            id_carro: makeFakeUpdatedServicoModel().carro.id,
            quilometragem: makeFakeUpdatedServicoModel().quilometragem
        });
    });

    // @TODO criar teste para validar se ocorreu update da nota fiscal
});

interface SutTypes {
    updateServicoRepositoryStub: UpdateServicoRepository;
    loadClienteByIdServicoRepositoryStub: LoadClienteByIdServicoRepository;
    updateIncludedItemRepositoryStub: UpdateIncludedItemRepository;
    loadIncludedItensRepositoryStub: LoadIncludedItensRepository;
    deleteIncludedItemRepositoryStub: DeleteIncludedItemRepository;
    loadNotaFiscalByIdServicoRepositoryStub: LoadNotaFiscalByIdServicoRepository;
    updateNotaFiscalRepositoryStub: UpdateNotaFiscalRepository;
    updateServiceMechanicsRepositoryStub: UpdateServiceMechanicsRepository;
    updateCarroRepositoryStub: UpdateCarroRepository;
    cancelBillingIntegrationStub: CancelBillingIntegration;
    saveSimpleBillingIntegrationStub: SaveSimpleBillingIntegration;
    loadAuthDetailIntegrationStub: LoadAuthDetailIntegration;
    loadProfileByUsernameRepositoryStub: LoadProfileByUsernameRepository;
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

const makeUpdateServiceMechanicsRepository = (): UpdateServiceMechanicsRepository => {
    class UpdateServiceMechanicsRepositoryStub implements UpdateServiceMechanicsRepository {
        update(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
            return Promise.resolve(mockFakeDbMechanicModelList());
        }
    }
    return new UpdateServiceMechanicsRepositoryStub();
};

const makeUpdateCarroRepository = (): UpdateCarroRepository => {
    class UpdateCarroRepositoryStub implements UpdateCarroRepository {
        async update(model: UpdateCarroModel): Promise<DbCarroModel> {
            return Promise.resolve({
                ...mockFakeDbCarroModel(),
                quilometragem: makeFakeUpdatedServicoModel().quilometragem
            });
        }
    }
    return new UpdateCarroRepositoryStub();
};

const makeCancelBillingIntegration = (): CancelBillingIntegration => {
    class CancelBillingIntegrationStub implements CancelBillingIntegration {
        async cancel(code: string): Promise<void> {
            return Promise.resolve();
        }
    }
    return new CancelBillingIntegrationStub();
};

const makeSaveSimpleBillingIntegration = (): SaveSimpleBillingIntegration => {
    class SaveSimpleBillingIntegrationStub implements SaveSimpleBillingIntegration {
        async save(data: SaveSimpleBillingIntegrationModel): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
            return Promise.resolve({ content: makeIntegrationLoadSimpleBillingModel() });
        }
    }
    return new SaveSimpleBillingIntegrationStub();
};

const makeLoadAuthDetailIntegration = (): LoadAuthDetailIntegration => {
    class LoadAuthDetailIntegrationStub implements LoadAuthDetailIntegration {
        async load(token: string): Promise<Wrapper<LoadAuthDetailIntegrationModel>> {
            return Promise.resolve({ content: makeLoadAuthDetailIntegrationModel() });
        }
    }
    return new LoadAuthDetailIntegrationStub();
};

const makeLoadProfileByUsernameRepository = (): LoadProfileByUsernameRepository => {
    class LoadProfileByUsernameRepositoryStub implements LoadProfileByUsernameRepository {
        async loadByUsername(username: string): Promise<DbProfileModel> {
            return Promise.resolve(mockFakeDbProfileModel());
        }
    }
    return new LoadProfileByUsernameRepositoryStub();
};

const makeSut = (): SutTypes => {
    const updateServicoRepositoryStub = makeUpdateServicoRepository();
    const loadClienteByIdServicoRepositoryStub = makeLoadClienteByIdServicoRepository();
    const updateIncludedItemRepositoryStub = makeUpdateIncludedItemRepository();
    const loadIncludedItensRepositoryStub = makeLoadIncludedItensRepository();
    const saveIncludedItensRepositoryStub = makeSaveIncludedItensRepository();
    const deleteIncludedItemRepositoryStub = makeDeleteIncludedItemRepository();
    const loadNotaFiscalByIdServicoRepositoryStub = makeLoadNotaFiscalByIdServicoRepository();
    const updateNotaFiscalRepositoryStub = makeUpdateNotaFiscalRepository();
    const updateServiceMechanicsRepositoryStub = makeUpdateServiceMechanicsRepository();
    const updateCarroRepositoryStub = makeUpdateCarroRepository();
    const cancelBillingIntegrationStub = makeCancelBillingIntegration();
    const saveSimpleBillingIntegrationStub = makeSaveSimpleBillingIntegration();
    const loadAuthDetailIntegrationStub = makeLoadAuthDetailIntegration();
    const loadProfileByUsernameRepositoryStub = makeLoadProfileByUsernameRepository();

    const sut = new DbUpdateServico(
        updateServicoRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub,
        loadIncludedItensRepositoryStub,
        saveIncludedItensRepositoryStub,
        deleteIncludedItemRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        updateNotaFiscalRepositoryStub,
        updateServiceMechanicsRepositoryStub,
        updateCarroRepositoryStub,
        cancelBillingIntegrationStub,
        saveSimpleBillingIntegrationStub,
        loadAuthDetailIntegrationStub,
        loadProfileByUsernameRepositoryStub
    );
    return {
        updateServicoRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        updateIncludedItemRepositoryStub,
        loadIncludedItensRepositoryStub,
        deleteIncludedItemRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        updateNotaFiscalRepositoryStub,
        updateServiceMechanicsRepositoryStub,
        updateCarroRepositoryStub,
        cancelBillingIntegrationStub,
        saveSimpleBillingIntegrationStub,
        loadAuthDetailIntegrationStub,
        loadProfileByUsernameRepositoryStub,
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
