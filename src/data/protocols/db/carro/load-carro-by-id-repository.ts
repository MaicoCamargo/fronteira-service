import { CarroModel } from '../../../../domain/models/carro-model';

export interface LoadCarroByIdRepository {
    loadById: (id: number) => Promise<CarroModel>;
}
