import { EnderecoPgRepository } from './endereco-pg-repository';
import { KnexHelper } from './helpers/knex-helper';
import { DbAddEnderecoModel } from '../../../data/protocols/db/endereco/save-endereco-repository';

const makeFakeAddEndereco = (): DbAddEnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade'
});
const makeSut = () => {
    return new EnderecoPgRepository();
};
describe('Endereço Postgres Repository', function () {
    beforeAll(async () => {
        await KnexHelper.forTenant().table('cliente_carro').del();
        await KnexHelper.forTenant().table('cliente').del();
        await KnexHelper.forTenant().table('endereco').del();
    });

    afterAll(async () => {
        await KnexHelper.destroy();
    });

    describe('save()', () => {
        test('Deve retornar o endereço em caso de sucesso', async () => {
            const sut = makeSut();
            const endereco = await sut.save(makeFakeAddEndereco());
            expect(endereco).toBeTruthy();
            expect(endereco.id_endereco).toBeTruthy();
            expect(endereco.rua).toBe(makeFakeAddEndereco().rua);
            expect(endereco.complemento).toBe(makeFakeAddEndereco().complemento);
            expect(endereco.numero).toBe(makeFakeAddEndereco().numero);
            expect(endereco.cep).toBe(makeFakeAddEndereco().cep);
            expect(endereco.cidade).toBe(makeFakeAddEndereco().cidade);
        });
    });

    describe('loadById()', () => {
        test('Deve retornar o endereço em caso de sucesso', async () => {
            const sut = makeSut();
            const endereco = await sut.save(makeFakeAddEndereco());
            const loaded = await sut.loadById(endereco.id_endereco);
            expect(loaded).toBeTruthy();
            expect(loaded.id_endereco).toBeTruthy();
            expect(loaded.rua).toBe(endereco.rua);
            expect(loaded.complemento).toBe(endereco.complemento);
            expect(loaded.numero).toBe(endereco.numero);
            expect(loaded.cep).toBe(endereco.cep);
            expect(loaded.cidade).toBe(endereco.cidade);
        });

        test('Deve retornar null se não encontrar o endereço', async () => {
            const sut = makeSut();
            const loaded = await sut.loadById(0);
            expect(loaded).toBeFalsy();
        });
    });
});
