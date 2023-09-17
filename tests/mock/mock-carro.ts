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
    placa: 'any_placa',
    quilometragem: 0,
    id_carro: 1
});

export const mockFakeDbCarroModelList = (): DbCarroModel[] => [
    {
        cor: 'any_cor',
        ano: 2020,
        modelo: 'any_modelo',
        placa: 'any_placa',
        quilometragem: 0,
        id_carro: 1
    },
    {
        cor: 'other_cor',
        ano: 2025,
        modelo: 'other_modelo',
        placa: 'other_placa',
        quilometragem: 10,
        id_carro: 2
    }
];

export const mockFakeCarroModel = (): CarroModel => ({
    cor: 'any_cor',
    ano: 2020,
    modelo: 'any_modelo',
    placa: 'any_placa',
    quilometragem: 0,
    id: 1
});

export const mockFakeCarroModelList = (): CarroModel[] => [
    {
        cor: 'any_cor',
        ano: 2020,
        modelo: 'any_modelo',
        placa: 'any_placa',
        quilometragem: 0,
        id: 1
    },
    {
        cor: 'other_cor',
        ano: 2025,
        modelo: 'other_modelo',
        placa: 'other_placa',
        quilometragem: 10,
        id: 2
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
