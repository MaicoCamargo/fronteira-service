import { knexInstance } from './helpers/knex-helper';
import { CarroPgRepository } from './carro-pg-repository';
import { mockFakeAddCarroModel } from '../../../../tests/mock/mock-carro';
import { DbEnderecoModel } from '../../../data/models/db-endereco-model';
import { DbClienteModel } from '../../../data/models/db-cliente-model';
import { mapper } from './helpers/mapper';
import { makePgClienteCreate } from '../../../../tests/mock/mock-db-cliente';

let cliente: DbClienteModel;

describe('Carro Postgres Repository', () => {
    beforeAll(async () => {
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        cliente = await makePgClienteCreate();
    });

    afterAll(async () => {
        await knexInstance('cliente_carro').del();
        await knexInstance('cliente').del();
        await knexInstance('endereco').del();
        await knexInstance('carro').del();
        await knexInstance.destroy();
    });

    describe('save()', () => {
        test('Deve criar e retornar um carro em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await sut.save(mockFakeAddCarroModel(), cliente.id_cliente);
            expect(carro).toBeTruthy();
            expect(carro.id_carro).toBeTruthy();
            expect(carro.modelo).toEqual(mockFakeAddCarroModel().modelo);
            expect(carro.ano).toEqual(mockFakeAddCarroModel().ano);
            expect(carro.cor).toEqual(mockFakeAddCarroModel().cor);
            expect(carro.quilometragem).toEqual(mockFakeAddCarroModel().quilometragem);
            const clienteCarro = mapper(
                await knexInstance('cliente_carro').where({ cliente_id: cliente.id_cliente, carro_id: carro.id_carro })
            );
            expect(clienteCarro).toBeTruthy();
            expect(clienteCarro.cliente_id).toEqual(cliente.id_cliente);
            expect(clienteCarro.carro_id).toEqual(carro.id_carro);
        });
    });

    describe('loadById()', () => {
        test('Deve retornar um carro em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await sut.save(mockFakeAddCarroModel(), cliente.id_cliente);
            const carroLoaded = await sut.loadById(carro.id_carro);
            expect(carroLoaded).toBeTruthy();
            expect(carroLoaded.id_carro).toBeTruthy();
            expect(carroLoaded.modelo).toEqual(mockFakeAddCarroModel().modelo);
            expect(carroLoaded.ano).toEqual(mockFakeAddCarroModel().ano);
            expect(carroLoaded.cor).toEqual(mockFakeAddCarroModel().cor);
            expect(carroLoaded.quilometragem).toEqual(mockFakeAddCarroModel().quilometragem);
            expect(carroLoaded.placa).toEqual(mockFakeAddCarroModel().placa);
        });
    });

    describe('update()', () => {
        test('Deve atualizar e retornar um carro em caso de sucesso', async () => {
            const sut = makeSut();
            const carro = await sut.save(mockFakeAddCarroModel(), cliente.id_cliente);
            const carroUpdated = await sut.update({
                id_carro: carro.id_carro,
                ano: 2020,
                cor: 'azul',
                quilometragem: 10000,
                modelo: 'fusca',
                placa: 'AAA-0000'
            });
            expect(carroUpdated).toBeTruthy();
            expect(carroUpdated.id_carro).toBeTruthy();
            expect(carroUpdated.modelo).toEqual('fusca');
            expect(carroUpdated.ano).toEqual(2020);
            expect(carroUpdated.cor).toEqual('azul');
            expect(carroUpdated.quilometragem).toEqual(10000);
            expect(carroUpdated.placa).toEqual('AAA-0000');
        });
    });

    describe('loadByClienteId()', () => {
        test('Deve retornar uma lista de carros em caso de sucesso', async () => {
            const sut = makeSut();
            await sut.save(mockFakeAddCarroModel(), cliente.id_cliente);
            const carrosLoaded = await sut.loadByClienteId(cliente.id_cliente);
            expect(carrosLoaded).toBeTruthy();
        });

        test('Deve retornar uma lista vazia caso não encontre carros', async () => {
            const sut = makeSut();
            const clientWithOutCarro = await makePgClienteCreate();
            const carrosLoaded = await sut.loadByClienteId(clientWithOutCarro.id_cliente);
            expect(carrosLoaded).toEqual([]);
        });
    });
});

const makeSut = (): CarroPgRepository => {
    return new CarroPgRepository();
};
