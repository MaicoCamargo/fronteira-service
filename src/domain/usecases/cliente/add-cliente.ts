import { ClienteModel } from '../../models/cliente-model';
import { AddCarroParams } from '../carro/add-carro';

export interface AddClienteParams {
    nome: string;
    telefone: string;
    cpf: string;
    carros?: AddCarroParams[];
}

export interface AddCliente {
    add: (params: AddClienteParams) => Promise<ClienteModel>;
}
