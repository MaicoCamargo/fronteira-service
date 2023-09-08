import { CarroModel } from '../../models/carro-model';

export interface LoadCarroById {
    loadById: (id: number) => Promise<CarroModel>;
}
