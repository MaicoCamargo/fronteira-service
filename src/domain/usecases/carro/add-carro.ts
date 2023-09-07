import { CarroModel } from '../../models/carro-model';

export type AddCarroParams = Omit<CarroModel, 'id'>;

export interface AddCarro {
    add: (params: AddCarroParams) => Promise<CarroModel>;
}
