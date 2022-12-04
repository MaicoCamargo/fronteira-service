import { ClienteModel } from '../models/cliente-model';

export interface AddClienteModel {
    nome: string;
    telefone: string;
    cpf: string;
    carro: string;
    endereco: string;
}
export interface AddCliente {
    add: (cliente: AddClienteModel) => Promise<ClienteModel>;
}
