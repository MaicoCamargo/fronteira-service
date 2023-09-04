import { DbEnderecoModel } from '../../../models/db-endereco-model';

export interface DbAddEnderecoModel {
    complemento: string;
    numero: string;
    rua: string;
    cidade: string;
    cep: string;
}

export interface AddEnderecoRepository {
    save: (endereco: DbAddEnderecoModel) => Promise<DbEnderecoModel>;
}
