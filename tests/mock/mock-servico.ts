import { DbServicoModel } from '../../src/data/models/db-servico-model';

export const mockFakeDbServicoModelList = (): DbServicoModel[] => [
    {
        id_servico: 1,
        valor: 100,
        data: new Date(),
        carro_id: 1,
        descricao: 'any_descricao',
        last_updated: new Date(),
        quilometragem: 1000
    },
    {
        id_servico: 2,
        valor: 200,
        data: new Date(),
        carro_id: 2,
        descricao: 'other_descricao',
        last_updated: new Date(),
        quilometragem: 2000
    }
];
