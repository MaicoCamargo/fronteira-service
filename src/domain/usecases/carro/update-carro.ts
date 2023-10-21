import { CarroModel } from '../../models/carro-model';

export interface UpdateCarroParams {
    id?: number;
    modelo: string;
    placa: string;
    ano: number;
    cor: string;
    quilometragem: number;
}

export interface UpdateCarro {
    update: (params: UpdateCarroParams) => Promise<CarroModel>;
}
