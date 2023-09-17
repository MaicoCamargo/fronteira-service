import { DbServicoModel } from '../../src/data/models/db-servico-model';
import { ServicoModel } from '../../src/domain/models/servico-model';
import { mockFakeCarroModelList } from './mock-carro';

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

export const mockFakeServicoModelList = (): ServicoModel[] => [
    {
        id: mockFakeDbServicoModelList()[0].id_servico,
        valor: mockFakeDbServicoModelList()[0].valor,
        data: mockFakeDbServicoModelList()[0].data,
        quilometragem: mockFakeDbServicoModelList()[0].quilometragem,
        descricao: mockFakeDbServicoModelList()[0].descricao,
        lastUpdate: mockFakeDbServicoModelList()[0].last_updated,
        carro: mockFakeCarroModelList()[0]
    },
    {
        id: mockFakeDbServicoModelList()[1].id_servico,
        valor: mockFakeDbServicoModelList()[1].valor,
        data: mockFakeDbServicoModelList()[1].data,
        quilometragem: mockFakeDbServicoModelList()[1].quilometragem,
        descricao: mockFakeDbServicoModelList()[1].descricao,
        lastUpdate: mockFakeDbServicoModelList()[1].last_updated,
        carro: mockFakeCarroModelList()[1]
    }
];
