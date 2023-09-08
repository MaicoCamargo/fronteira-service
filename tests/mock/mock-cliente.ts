import { DbClienteModel } from '../../src/data/models/db-cliente-model';
import { ClienteModel } from '../../src/domain/models/cliente-model';
import { UpdateClienteParams } from '../../src/domain/usecases/cliente/update-cliente';
import { mockFakeCarroModel } from './mock-carro';
import { AddClienteParams } from '../../src/domain/usecases/cliente/add-cliente';

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
    endereco: 1,
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
    {
        id: 1,
        cpf: 'any_cpf',
        nome: 'any_nome',
        endereco: 1,
        lastUpdated: new Date('2022-01-01'),
        telefone: 'any_telefone'
    },
    {
        id: 2,
        cpf: 'other_cpf',
        nome: 'other_nome',
        endereco: 2,
        lastUpdated: new Date('2022-01-01'),
        telefone: 'other_telefone'
    }
];

export const makeFakeDbClienteModelList = (): DbClienteModel[] => [
    {
        id_cliente: 1,
        cpf: 'any_cpf',
        carro_id: 1,
        nome: 'any_nome',
        endereco_id: 1,
        last_updated: new Date('2022-01-01'),
        telefone: 'any_telefone'
    },
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
