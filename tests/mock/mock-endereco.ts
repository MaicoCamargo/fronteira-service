import { DbEnderecoModel } from '../../src/data/models/db-endereco-model';
import { EnderecoModel } from '../../src/domain/models/endereco-model';
import { AddEnderecoParams } from '../../src/domain/usecases/endereco/add-endereco';

export const mockFakeDbEnderecoModel = (): DbEnderecoModel => ({
    id_endereco: 1,
    cep: 'any_cep',
    cidade: 'any_cidade',
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero'
});

export const makeFakeEnderecoModel = (): EnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade',
    id: 1
});

export const makeFakeAddEnderecoParams = (): AddEnderecoParams => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade'
});

export const makeFakeDbEnderecoModel = (): DbEnderecoModel => ({
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero',
    cep: 'any_cep',
    cidade: 'any_cidade',
    id_endereco: 1
});
