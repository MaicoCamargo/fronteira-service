import { DbClienteModel } from '../../src/data/models/db-cliente-model';
import { ClienteModel } from '../../src/domain/models/cliente-model';
import { UpdateClienteParams } from '../../src/domain/usecases/cliente/update-cliente';
import { mockFakeCarroModel } from './mock-carro';
import { AddClienteParams } from '../../src/domain/usecases/cliente/add-cliente';
import { mockFakeEnderecoModel } from './mock-endereco';

export const mockFakeDbClienteModel = (): DbClienteModel => ({
    id_cliente: 1,
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    carro_id: 1,
    endereco_id: 1,
    last_updated: new Date('2021-02-28 00:00:00')
});

export const mockFakeClienteModel = (): ClienteModel => ({
    id: 1,
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    carro: mockFakeCarroModel(),
    endereco: mockFakeEnderecoModel(),
    lastUpdated: new Date('2021-02-28 00:00:00')
});

export const mockFakeUpdateClienteParams = (): UpdateClienteParams => ({
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    nome: 'any_nome',
    id: 1
});

export const mockFakeAddClienteParams = (): AddClienteParams => ({
    nome: 'any_name',
    cpf: 'any_cpf',
    telefone: 'any_telefone'
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
        carro: {
            cor: 'other_cor',
            ano: 2020,
            modelo: 'other_modelo',
            placa: 'other_placa',
            quilometragem: 0,
            id: 2
        }
    }
];

export const makeFakeDbClienteModelList = (): DbClienteModel[] => [
    mockFakeDbClienteModel(),
    {
        id_cliente: 2,
        cpf: 'other_cpf',
        carro_id: 2,
        nome: 'other_nome',
        endereco_id: 2,
        last_updated: new Date('2022-01-01'),
        telefone: 'other_telefone'
    }
];
