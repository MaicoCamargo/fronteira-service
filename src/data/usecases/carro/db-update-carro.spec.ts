import { UpdateCarroModel, UpdateCarroRepository } from '../../protocols/db/carro/update-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import {
    mockFakeDbCarroModel,
    mockFakeUpdateCarroModel,
    mockFakeUpdateCarroParams
} from '../../../../tests/mock/mock-carro';
import { DbUpdateCarro } from './db-update-carro';

describe('DbUpdateCarro Usecase', () => {
    test('Deve chamar UpdateCarroRepository com valores corretos', async () => {
        const { sut, updateCarroRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateCarroRepositoryStub, 'update');
        await sut.update(mockFakeUpdateCarroParams());
        expect(updateSpy).toHaveBeenCalledWith(mockFakeUpdateCarroModel());
    });
});

const makeUpdateCarroRepository = (): UpdateCarroRepository => {
    class UpdateCarroRepositoryStub implements UpdateCarroRepository {
        async update(model: UpdateCarroModel): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }
    return new UpdateCarroRepositoryStub();
};

interface SutTypes {
    sut: DbUpdateCarro;
    updateCarroRepositoryStub: UpdateCarroRepository;
}
const makeSut = (): SutTypes => {
    const updateCarroRepositoryStub = makeUpdateCarroRepository();
    const sut = new DbUpdateCarro(updateCarroRepositoryStub);

    return {
        sut,
        updateCarroRepositoryStub
    };
};
