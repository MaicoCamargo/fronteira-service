import { EnderecoPgRepository } from './endereco-pg-repository';
import { knexInstance } from './helpers/knex-helper';
import { DbAddEnderecoParams } from '../../../data/protocols/db/endereco/add-endereco-repository';

const makeFakeAddEndereco = (): DbAddEnderecoParams => ({
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
    afterAll(async () => {
        await knexInstance('endereco').del();
        await knexInstance.destroy();
    });

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
