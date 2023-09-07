import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { mockFakeCarroModel, mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { DbCarroModel } from '../../models/db-carro-model';
import { DbAddCarro } from './db-add-carro';

describe('DbAddCarro Usecase', () => {
    test('Deve chamar SaveCarroRepository com valores corretos', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(saveCarroRepositoryStub, 'save');
        await sut.add(mockFakeCarroModel());
        expect(addSpy).toBeCalledWith(mockFakeCarroModel());
    });
});

const makeSaveCarroRepository = (): SaveCarroRepository => {
    class SaveCarroRepositoryStub implements SaveCarroRepository {
        save(carroModel: AddCarroModel): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new SaveCarroRepositoryStub();
};

interface SutTypes {
    sut: DbAddCarro;
    saveCarroRepositoryStub: SaveCarroRepository;
}

const makeSut = (): SutTypes => {
    const saveCarroRepositoryStub = makeSaveCarroRepository();
    const sut = new DbAddCarro(saveCarroRepositoryStub);
    return {
        sut,
        saveCarroRepositoryStub
    };
};
