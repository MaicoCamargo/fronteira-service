import { DbCarroModel } from '../../../models/db-carro-model';

export interface UpdateCarroModel {
    ano: number;
    cor: string;
    kilometragem: number;
    modelo: string;
    placa: string;
    id_carro: number;
}

export interface UpdateCarroRepository {
    update: (model: UpdateCarroModel) => Promise<DbCarroModel>;
}
