import { ClienteModel } from '../../models/cliente-model';

export interface AddClienteParams {
    nome: string;
    telefone: string;
    cpf: string;
    carro: {
        placa: string;
        modelo: string;
        cor: string;
        ano: string;
        quilometragem: string;
    };
    endereco: {
        rua: string;
        cidade: string;
        cep: string;
        numero: string;
        complemento: string;
    };
}

export interface AddCliente {
    add: (params: AddClienteParams) => Promise<ClienteModel>;
}
