import { CarroModel } from './carro-model';
import { EnderecoModel } from './endereco-model';

export interface ClienteModel {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
    carro?: CarroModel;
    endereco?: EnderecoModel;
    lastUpdated: Date;
}
