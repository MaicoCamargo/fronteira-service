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
});

interface SutTypes {
    sut: DbAddServico;
    saveServicoRepositoryStub: SaveServicoRepository;
    saveIncludedItensRepositoryStub: SaveIncludedItensRepository;
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

const makeSut = (): SutTypes => {
    const saveServicoRepositoryStub = makeSaveServicoRepository();
    const saveIncludedItensRepositoryStub = makeSaveIncludedItensRepository();
    const sut = new DbAddServico(saveServicoRepositoryStub, saveIncludedItensRepositoryStub);
    return {
        sut,
        saveServicoRepositoryStub,
        saveIncludedItensRepositoryStub
    };
};
