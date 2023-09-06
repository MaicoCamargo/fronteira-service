import { DbClienteModel } from '../../src/data/models/db-cliente-model';
import { ClienteModel } from '../../src/domain/models/cliente-model';

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
    carro: 1,
    endereco: 1,
    lastUpdated: new Date('2021-02-28 00:00:00')
});
