import { AddCarroModel } from '../../src/data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../src/data/models/db-carro-model';

export const mockFakeCarroModel = (): AddCarroModel => ({
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
