import { DbEnderecoModel } from '../../../models/db-endereco-model';

export interface DbAddEnderecoModel {
    complemento: string;
    numero: string;
    rua: string;
    cidade: string;
    cep: string;
}

export interface SaveEnderecoRepository {
    save: (endereco: DbAddEnderecoModel) => Promise<DbEnderecoModel>;
}
