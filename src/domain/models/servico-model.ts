import { CarroModel } from './carro-model';

export interface ServicoModel {
    id: number;
    descricao?: string;
    valor: number;
    data: Date;
    carro: CarroModel;
    quilometragem?: number;
    lastUpdate?: Date;
}
