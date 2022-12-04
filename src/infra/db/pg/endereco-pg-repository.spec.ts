import { EnderecoPgRepository } from './endereco-pg-repository';
import { knexInstance } from './helpers/knex-helper';
import { AddEnderecoParams } from '../../../domain/usecases/cliente/add-endereco';
// fixme duplicar os models do domain no data
const makeFakeAddEndereco = (): AddEnderecoParams => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade'
});
const makeSut = () => {
    return new EnderecoPgRepository();
};
describe('Endereço Mysql Repository', function () {
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
