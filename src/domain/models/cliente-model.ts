import { CarroModel } from './carro-model';

export interface ClienteModel {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
    carro?: CarroModel;
    endereco: any;
    lastUpdated: Date;
}
