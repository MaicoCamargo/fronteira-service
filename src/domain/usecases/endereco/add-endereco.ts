import { EnderecoModel } from '../../models/endereco-model';

export interface AddEnderecoParams {
    complemento: string;
    numero: string;
    rua: string;
    cidade: string;
    cep: string;
}

export interface AddEndereco {
    add: (params: AddEnderecoParams) => Promise<EnderecoModel>;
}
