import { AddCarroModel, SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { mockFakeAddCarroModel, mockFakeCarroModel, mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { DbCarroModel } from '../../models/db-carro-model';
import { DbAddCarro } from './db-add-carro';
import { knexInstance } from '../../../infra/db/pg/helpers/knex-helper';
import { throwError } from '../../../../tests/helper/test-helper';

describe('DbAddCarro Usecase', () => {
    beforeAll(async () => {
        await knexInstance('carro').del();
    });

    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });

    test('Deve chamar SaveCarroRepository com valores corretos', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(saveCarroRepositoryStub, 'save');
        await sut.add(mockFakeCarroModel());
        expect(addSpy).toBeCalledWith(mockFakeCarroModel());
    });

    test('Deve lançar exceção se SaveCarroRepository lançar exceção', async () => {
        const { sut, saveCarroRepositoryStub } = makeSut();
        jest.spyOn(saveCarroRepositoryStub, 'save').mockImplementationOnce(throwError);
        const promise = sut.add(mockFakeDbCarroModel());
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar um carro se SaveCarroRepository retornar um carro', async () => {
        const { sut } = makeSut();
        const carro = await sut.add(mockFakeAddCarroModel());
        expect(carro).toEqual(mockFakeCarroModel());
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
