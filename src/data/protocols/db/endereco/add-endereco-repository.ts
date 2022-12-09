import { DbEnderecoModel } from '../../../models/db-endereco-model';

export interface DbAddEnderecoParams {
    complemento: string;
    numero: string;
    rua: string;
    cidade: string;
    cep: string;
}

export interface AddEnderecoRepository {
    save: (endereco: DbAddEnderecoParams) => Promise<DbEnderecoModel>;
}
