import { DbEnderecoModel } from '../../../models/db-endereco-model';

export interface LoadEnderecoByIdRepository {
    loadById: (id: number) => Promise<DbEnderecoModel>;
}
