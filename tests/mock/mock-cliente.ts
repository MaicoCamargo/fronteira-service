import { DbClienteModel } from '../../src/data/models/db-cliente-model';
import { ClienteModel } from '../../src/domain/models/cliente-model';
import { UpdateClienteParams } from '../../src/domain/usecases/cliente/update-cliente';
import { mockFakeAddCarroParams, mockFakeCarroModel, mockFakeUpdateCarroParams } from './mock-carro';
import { AddClienteParams } from '../../src/domain/usecases/cliente/add-cliente';
import { makeFakeEnderecoModel, mockFakeAddEnderecoParams } from './mock-endereco';
import { AddClienteModel } from '../../src/data/protocols/db/cliente/save-cliente-repository';

export const mockFakeDbClienteModel = (): DbClienteModel => ({
    id_cliente: 1,
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    endereco_id: 1
});

export const mockFakeClienteModel = (): ClienteModel => ({
    id: 1,
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    carros: [mockFakeCarroModel()],
    endereco: makeFakeEnderecoModel()
});

export const mockFakeUpdateClienteParams = (): UpdateClienteParams => ({
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    nome: 'any_nome',
    id: 1,
    carros: [mockFakeUpdateCarroParams()]
});

export const mockFakeAddClienteParams = (): AddClienteParams => ({
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    carros: [mockFakeAddCarroParams()],
    endereco: mockFakeAddEnderecoParams()
});

export const makeFakeLoadClienteModelList = (): ClienteModel[] => [
    mockFakeClienteModel(),
    {
        id: 2,
        cpf: 'other_cpf',
        nome: 'other_nome',
        endereco: {
            id: 2,
            cep: 'other_cep',
            rua: 'other_rua',
            numero: 'other_numero',
            complemento: 'other_complemento',
            cidade: 'other_cidade'
        },
        lastUpdated: new Date('2022-01-01'),
        telefone: 'other_telefone',
        carros: []
    }
];

export const makeFakeDbClienteModelList = (): DbClienteModel[] => [
    mockFakeDbClienteModel(),
    {
        id_cliente: 2,
        cpf: 'other_cpf',
        nome: 'other_nome',
        endereco_id: 2,
        last_updated: new Date('2022-01-01'),
        telefone: 'other_telefone'
    }
];

export const mockFakeAddClienteModel = (): AddClienteModel => ({
    cpf: 'any_cpf',
    nome: 'any_nome',
    last_updated: new Date(),
    telefone: 'any_telefone',
    endereco_id: makeFakeEnderecoModel().id
});
