import { DbClienteModel } from '../../../models/db-cliente-model';
import { DbCarroModel } from '../../../models/db-carro-model';

export type AddCarroModel = Omit<DbCarroModel, 'id_carro'>;

export interface SaveCarroRepository {
    save: (carroModel: AddCarroModel) => Promise<DbClienteModel>;
}
