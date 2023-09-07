import { DbCarroModel } from '../../../models/db-carro-model';

export interface AddCarroModel {
    ano: number;
    cor: string;
    kilometragem: number;
    modelo: string;
    placa: string;
}

export interface SaveCarroRepository {
    save: (model: AddCarroModel) => Promise<DbCarroModel>;
}
