import { DbEnderecoModel } from '../../src/data/models/db-endereco-model';
import { EnderecoModel } from '../../src/domain/models/endereco-model';

export const mockFakeDbEnderecoModel = (): DbEnderecoModel => ({
    id_endereco: 1,
    cep: 'any_cep',
    cidade: 'any_cidade',
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero'
});

export const mockFakeEnderecoModel = (): EnderecoModel => ({
    id: 1,
    cep: 'any_cep',
    cidade: 'any_cidade',
    rua: 'any_rua',
    complemento: 'any_complemento',
    numero: 'any_numero'
});
