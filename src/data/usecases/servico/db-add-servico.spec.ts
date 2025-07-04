import { DbAddServico } from './db-add-servico';
import { SaveServicoModel, SaveServicoRepository } from '../../protocols/db/servico/save-servico-repository';
import { DbServicoModel } from '../../models/db-servico-model';
import {
    mockFakeAddServicoParams,
    mockFakeDbServicoModel,
    mockFakeSaveServicoModel,
    mockFakeServicoModel
} from '../../../../tests/mock/mock-servico';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { throwError } from '../../../../tests/helper/test-helper';
import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../protocols/db/servico/included-item/save-included-itens-repository';
import { DbIncludedItemModel } from '../../models/db-included-item-model';
import {
    mockFakeDbIncludedItemModelList,
    mockFakeSaveIncludedItemModelList
} from '../../../../tests/mock/mock-included-itens';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { SaveNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/save-nota-fiscal-repository';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { mockFakeDbMechanicModelList } from '../../../../tests/mock/mock-mechanic';
import {
    AddMechanicsModel,
    SaveServiceMechanicsRepository
} from '@/data/protocols/db/mechanic/save-service-mechanics-repository';
import { UpdateCarroModel, UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';
import { DbCarroModel } from '@/data/models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { makeIntegrationLoadSimpleBillingModel } from '../../../../tests/mock/mock-integration-load-simple-billing-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

describe('DbAddServico Use Case', () => {
    beforeAll(async () => {
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        mockDateAdapter.reset();
    });

    test('Deve criar um serviço em caso de sucesso', async () => {
        const { sut } = makeSut();
        const model = await sut.add(mockFakeAddServicoParams());
        expect(model).toEqual(mockFakeServicoModel());
    });

    test('Deve lançar uma exceção se SaveServicoRepository lançar uma exceção', async () => {
        const { sut, saveServicoRepositoryStub } = makeSut();
        jest.spyOn(saveServicoRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeAddServicoParams());
        await expect(promise).rejects.toThrow();
    });

    test('Deve chamar SaveServicoRepository com os valores corretos', async () => {
        const { sut, saveServicoRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(saveServicoRepositoryStub, 'save');
        await sut.add(mockFakeAddServicoParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeSaveServicoModel());
    });

    test('Deve chamar SaveIncludedItensRepository com os valores corretos', async () => {
        const { sut, saveIncludedItensRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(saveIncludedItensRepositoryStub, 'save');
        await sut.add(mockFakeAddServicoParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeSaveIncludedItemModelList());
    });

    test('Deve lançar uma exceção se SaveIncludedItensRepository lançar uma exceção', async () => {
        const { sut, saveIncludedItensRepositoryStub } = makeSut();
        jest.spyOn(saveIncludedItensRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeAddServicoParams());
        await expect(promise).rejects.toThrow();
    });

    test('Deve chamar SaveServiceMechanicsRepository com os valores corretos', async () => {
        const { sut, saveServiceMechanicsRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(saveServiceMechanicsRepositoryStub, 'save');
        await sut.add(mockFakeAddServicoParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeServicoModel().id, mockFakeAddServicoParams().mechanics);
    });

    test('Deve chamar UpdateCarroRepository com os valores corretos', async () => {
        const { sut, updateCarroRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(updateCarroRepositoryStub, 'update');
        await sut.add(mockFakeAddServicoParams());
        expect(saveSpy).toHaveBeenCalledWith({
            id_carro: mockFakeAddServicoParams().carro.id,
            quilometragem: mockFakeAddServicoParams().quilometragem
        });
    });
});

interface SutTypes {
    sut: DbAddServico;
    saveServicoRepositoryStub: SaveServicoRepository;
    saveIncludedItensRepositoryStub: SaveIncludedItensRepository;
    loadNotaFiscalByIdServicoRepositoryStub: LoadNotaFiscalByIdServicoRepository;
    saveNotaFiscalRepositoryStub: SaveNotaFiscalRepository;
    saveServiceMechanicsRepositoryStub: SaveServiceMechanicsRepository;
    updateCarroRepositoryStub: UpdateCarroRepository;
    saveSimpleBillingIntegrationStub: SaveSimpleBillingIntegration;
}

const makeSaveServicoRepository = (): SaveServicoRepository => {
    class AddServicoRepositoryStub implements SaveServicoRepository {
        save(model: SaveServicoModel): Promise<DbServicoModel> {
            return Promise.resolve(mockFakeDbServicoModel());
        }
    }

    return new AddServicoRepositoryStub();
};

const makeSaveIncludedItensRepository = (): SaveIncludedItensRepository => {
    class SaveIncludedItensRepositoryStub implements SaveIncludedItensRepository {
        async save(itens: SaveIncludedItemModel[]): Promise<DbIncludedItemModel[]> {
            return mockFakeDbIncludedItemModelList();
        }
    }

    return new SaveIncludedItensRepositoryStub();
};

const makeLoadNotaFiscalByIdServicoRepository = (): LoadNotaFiscalByIdServicoRepository => {
    class LoadNotaFiscalByIdServicoRepositoryStub implements LoadNotaFiscalByIdServicoRepository {
        load(idServico: number): Promise<boolean> {
            return Promise.resolve(false);
        }
    }

    return new LoadNotaFiscalByIdServicoRepositoryStub();
};

const makeSaveNotaFiscalByIdServicoRepository = (): SaveNotaFiscalRepository => {
    class SaveNotaFiscalRepositoryStub implements SaveNotaFiscalRepository {
        save(idServico: number): Promise<void> {
            return;
        }
    }

    return new SaveNotaFiscalRepositoryStub();
};

const makeSaveServiceMechanicsRepository = (): SaveServiceMechanicsRepository => {
    class SaveServiceMechanicsRepositoryStub implements SaveServiceMechanicsRepository {
        save(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
            return Promise.resolve(mockFakeDbMechanicModelList());
        }
    }

    return new SaveServiceMechanicsRepositoryStub();
};

const makeUpdateCarroRepository = (): UpdateCarroRepository => {
    class UpdateCarroRepositoryStub implements UpdateCarroRepository {
        async update(model: UpdateCarroModel): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }

    return new UpdateCarroRepositoryStub();
};

const makeSaveSimpleBillingIntegration = (): SaveSimpleBillingIntegration => {
    class SaveSimpleBillingIntegrationStub implements SaveSimpleBillingIntegration {
        save(billing: SaveSimpleBillingIntegrationModel): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
            return Promise.resolve({ content: makeIntegrationLoadSimpleBillingModel() });
        }
    }
    return new SaveSimpleBillingIntegrationStub();
};

const makeSut = (): SutTypes => {
    const saveServicoRepositoryStub = makeSaveServicoRepository();
    const saveIncludedItensRepositoryStub = makeSaveIncludedItensRepository();
    const loadNotaFiscalByIdServicoRepositoryStub = makeLoadNotaFiscalByIdServicoRepository();
    const saveNotaFiscalRepositoryStub = makeSaveNotaFiscalByIdServicoRepository();
    const saveServiceMechanicsRepositoryStub = makeSaveServiceMechanicsRepository();
    const updateCarroRepositoryStub = makeUpdateCarroRepository();
    const saveSimpleBillingIntegrationStub = makeSaveSimpleBillingIntegration();

    const sut = new DbAddServico(
        saveServicoRepositoryStub,
        saveIncludedItensRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        saveNotaFiscalRepositoryStub,
        saveServiceMechanicsRepositoryStub,
        updateCarroRepositoryStub,
        saveSimpleBillingIntegrationStub
    );
    return {
        sut,
        saveServicoRepositoryStub,
        saveIncludedItensRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        saveNotaFiscalRepositoryStub,
        saveServiceMechanicsRepositoryStub,
        updateCarroRepositoryStub,
        saveSimpleBillingIntegrationStub
    };
};
