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
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { mockFakeDbMechanicModelList } from '../../../../tests/mock/mock-mechanic';

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

    test('Deve chamar LoadMechanicsByIdServicoRepository com os valores corretos', async () => {
        const { sut, loadMechanicsByIdServicoRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(loadMechanicsByIdServicoRepositoryStub, 'loadByIdServico');
        await sut.add(mockFakeAddServicoParams());
        expect(saveSpy).toHaveBeenCalledWith(mockFakeServicoModel().id);
    });
});

interface SutTypes {
    sut: DbAddServico;
    saveServicoRepositoryStub: SaveServicoRepository;
    saveIncludedItensRepositoryStub: SaveIncludedItensRepository;
    loadNotaFiscalByIdServicoRepositoryStub: LoadNotaFiscalByIdServicoRepository;
    saveNotaFiscalRepositoryStub: SaveNotaFiscalRepository;
    loadMechanicsByIdServicoRepositoryStub: LoadMechanicsByIdServicoRepository;
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
    const saveServicoRepositoryStub = makeSaveServicoRepository();
    const saveIncludedItensRepositoryStub = makeSaveIncludedItensRepository();
    const loadNotaFiscalByIdServicoRepositoryStub = makeLoadNotaFiscalByIdServicoRepository();
    const saveNotaFiscalRepositoryStub = makeSaveNotaFiscalByIdServicoRepository();
    const loadMechanicsByIdServicoRepositoryStub = makeLoadMechanicsByIdServicoRepository();
    const sut = new DbAddServico(
        saveServicoRepositoryStub,
        saveIncludedItensRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        saveNotaFiscalRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub
    );
    return {
        sut,
        saveServicoRepositoryStub,
        saveIncludedItensRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        saveNotaFiscalRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub
    };
};
