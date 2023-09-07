import { DbCarroModel } from '../../../models/db-carro-model';

export type AddCarroModel = Omit<DbCarroModel, 'id_carro'>;

export interface SaveCarroRepository {
    save: (model: AddCarroModel) => Promise<DbCarroModel>;
}
