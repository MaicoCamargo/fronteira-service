import { DbCarroModel } from '../../../models/db-carro-model';

export interface LoadCarroByIdParams {
    id_carro: number;
    dh_exclusion?: Date;
}

export interface LoadCarroByIdRepository {
    loadById: (params: LoadCarroByIdParams) => Promise<DbCarroModel>;
}
