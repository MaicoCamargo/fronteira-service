import { knexInstance } from './helpers/knex-helper';
import { CarroPgRepository } from './carro-pg-repository';
import { mockFakeAddCarroModel } from '../../../../tests/mock/mock-carro';

describe('Carro Postgres Repository', () => {
    beforeAll(async () => {
        await knexInstance('carro').del();
    });

    afterAll(async () => {
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });

    describe('save()', () => {
        test('Deve criar e retornar um carro em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await sut.save(mockFakeAddCarroModel());
            expect(carro).toBeTruthy();
            expect(carro.id_carro).toBeTruthy();
            expect(carro.modelo).toEqual(mockFakeAddCarroModel().modelo);
            expect(carro.ano).toEqual(mockFakeAddCarroModel().ano);
            expect(carro.cor).toEqual(mockFakeAddCarroModel().cor);
            expect(carro.kilometragem).toEqual(mockFakeAddCarroModel().kilometragem);
        });
    });

    describe('loadById()', () => {
        test('Deve retornar um carro em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await sut.save(mockFakeAddCarroModel());
            const carroLoaded = await sut.loadById(carro.id_carro);
            expect(carroLoaded).toBeTruthy();
            expect(carroLoaded.id_carro).toBeTruthy();
            expect(carroLoaded.modelo).toEqual(mockFakeAddCarroModel().modelo);
            expect(carroLoaded.ano).toEqual(mockFakeAddCarroModel().ano);
            expect(carroLoaded.cor).toEqual(mockFakeAddCarroModel().cor);
            expect(carroLoaded.kilometragem).toEqual(mockFakeAddCarroModel().kilometragem);
            expect(carroLoaded.placa).toEqual(mockFakeAddCarroModel().placa);
        });
    });
});

const makeSut = (): CarroPgRepository => {
    return new CarroPgRepository();
};
