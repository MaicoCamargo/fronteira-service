import { UpdateCarroRepository } from '../../protocols/db/carro/update-carro-repository';
import { mockFakeUpdateCarroModel, mockFakeUpdateCarroParams } from '../../../../tests/mock/mock-carro';
import { DbUpdateCarro } from './db-update-carro';
import { makeUpdateCarroRepository } from '../../../../tests/mock/mock-update-carro-repository';

describe('DbUpdateCarro Usecase', () => {
    test('Deve chamar UpdateCarroRepository com valores corretos', async () => {
        const { sut, updateCarroRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateCarroRepositoryStub, 'update');
        await sut.update(mockFakeUpdateCarroParams());
        expect(updateSpy).toHaveBeenCalledWith(mockFakeUpdateCarroModel());
    });
});

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
