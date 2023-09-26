import { ClienteModel } from '../../models/cliente-model';
import { AddCarroParams } from '../carro/add-carro';
import { AddEnderecoParams } from '../endereco/add-endereco';

export interface AddClienteParams {
    nome: string;
    telefone: string;
    cpf: string;
    carros?: AddCarroParams[];
    endereco?: AddEnderecoParams;
}

export interface AddCliente {
    add: (params: AddClienteParams) => Promise<ClienteModel>;
}
