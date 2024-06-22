import { DbServicoModel } from '../../src/data/models/db-servico-model';
import { ServicoModel } from '../../src/domain/models/servico-model';
import { mockFakeCarroModelList } from './mock-carro';
import { mockFakeAddItemParams, mockFakeIncludedItemModelList } from './mock-included-itens';
import { AddServicoParams } from '../../src/domain/usecases/servico/add-servico';
import { SaveServicoModel } from '../../src/data/protocols/db/servico/save-servico-repository';
import { mockFakeClienteModel } from './mock-cliente';

export const mockFakeAddServicoParams = (): AddServicoParams => ({
    valor: 100,
    descricao: 'any_descricao',
    carro: mockFakeCarroModelList()[0],
    itens: [mockFakeAddItemParams()],
    quilometragem: 1000,
    cliente: {
        id: mockFakeClienteModel().id,
        nome: mockFakeClienteModel().nome
    }
});

export const mockFakeSaveServicoModel = (): SaveServicoModel => ({
    valor: 100,
    carro_id: 1,
    descricao: 'any_descricao',
    quilometragem: 1000
});

export const mockFakeDbServicoModelList = (): DbServicoModel[] => [
    {
        id_servico: 1,
        valor: 100,
        carro_id: 1,
        descricao: 'any_descricao',
        quilometragem: 1000
    },
    {
        id_servico: 2,
        valor: 200,
        carro_id: 2,
        descricao: 'other_descricao',
        quilometragem: 2000
    }
];

export const mockFakeDbServicoModel = (): DbServicoModel => mockFakeDbServicoModelList()[0];

export const mockFakeServicoModelList = (): ServicoModel[] => [
    {
        id: mockFakeDbServicoModelList()[0].id_servico,
        valor: mockFakeDbServicoModelList()[0].valor,
        data: mockFakeDbServicoModelList()[0].data,
        quilometragem: mockFakeDbServicoModelList()[0].quilometragem,
        descricao: mockFakeDbServicoModelList()[0].descricao,
        lastUpdate: mockFakeDbServicoModelList()[0].last_updated,
        carro: mockFakeCarroModelList()[0],
        itens: mockFakeIncludedItemModelList(),
        cliente: {
            id: mockFakeClienteModel().id,
            nome: mockFakeClienteModel().nome
        },
        nota: false
    },
    {
        id: mockFakeDbServicoModelList()[1].id_servico,
        valor: mockFakeDbServicoModelList()[1].valor,
        data: mockFakeDbServicoModelList()[1].data,
        quilometragem: mockFakeDbServicoModelList()[1].quilometragem,
        descricao: mockFakeDbServicoModelList()[1].descricao,
        lastUpdate: mockFakeDbServicoModelList()[1].last_updated,
        carro: mockFakeCarroModelList()[1],
        itens: [],
        cliente: {
            id: mockFakeClienteModel().id,
            nome: mockFakeClienteModel().nome
        },
        nota: false
    }
];

export const mockFakeServicoModel = (): ServicoModel => mockFakeServicoModelList()[0];
