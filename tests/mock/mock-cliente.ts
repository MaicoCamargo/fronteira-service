import { DbClienteModel } from '../../src/data/models/db-cliente-model';

export const mockFakeDbClienteModel = (): DbClienteModel => ({
    id_cliente: 1,
    nome: 'any_nome',
    cpf: 'any_cpf',
    telefone: 'any_telefone',
    carro_id: 1,
    endereco_id: 1,
    last_updated: new Date('2021-02-28 00:00:00')
});
