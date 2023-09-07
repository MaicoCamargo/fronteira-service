import { DbCarroModel } from '../../../models/db-carro-model';

export interface LoadCarroByIdRepository {
    loadById: (id: number) => Promise<DbCarroModel>;
}
