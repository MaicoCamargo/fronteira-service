import { AddCarroModel } from '../../src/data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../src/data/models/db-carro-model';
import { CarroModel } from '../../src/domain/models/carro-model';
import { AddCarroParams } from '../../src/domain/usecases/carro/add-carro';
import { UpdateCarroParams } from '../../src/domain/usecases/carro/update-carro';
import { UpdateCarroModel } from '../../src/data/protocols/db/carro/update-carro-repository';

export const mockFakeAddCarroModel = (): AddCarroModel => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0
});

export const mockFakeDbCarroModel = (): DbCarroModel => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'ANY_PLACA',
    quilometragem: 0,
    id_carro: 1
});

export const mockFakeDbCarroModelList = (): DbCarroModel[] => [
    { ...mockFakeDbCarroModel() },
    {
        cor: 'other_cor',
        ano: 2025,
        modelo: 'other_modelo',
        placa: 'OTHER_PLACA',
        quilometragem: 10,
        id_carro: 2
    }
];

export const mockFakeCarroModel = (): CarroModel => ({
    cor: mockFakeDbCarroModel().cor,
    ano: mockFakeDbCarroModel().ano,
    modelo: mockFakeDbCarroModel().modelo,
    placa: mockFakeDbCarroModel().placa,
    quilometragem: mockFakeDbCarroModel().quilometragem,
    id: mockFakeDbCarroModel().id_carro
});

export const mockFakeCarroModelList = (): CarroModel[] => [
    {
        cor: mockFakeDbCarroModelList()[0].cor,
        ano: mockFakeDbCarroModelList()[0].ano,
        modelo: mockFakeDbCarroModelList()[0].modelo,
        placa: mockFakeDbCarroModelList()[0].placa,
        quilometragem: mockFakeDbCarroModelList()[0].quilometragem,
        id: mockFakeDbCarroModelList()[0].id_carro
    },
    {
        cor: mockFakeDbCarroModelList()[1].cor,
        ano: mockFakeDbCarroModelList()[1].ano,
        modelo: mockFakeDbCarroModelList()[1].modelo,
        placa: mockFakeDbCarroModelList()[1].placa,
        quilometragem: mockFakeDbCarroModelList()[1].quilometragem,
        id: mockFakeDbCarroModelList()[1].id_carro
    }
];

export const mockFakeAddCarroParams = (): AddCarroParams => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0
});

export const mockFakeUpdateCarroParams = (): UpdateCarroParams => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0,
    id: 1
});

export const mockFakeUpdateCarroModel = (): UpdateCarroModel => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0,
    id_carro: 1
});
