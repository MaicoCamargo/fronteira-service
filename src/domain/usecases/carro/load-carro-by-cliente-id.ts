import { CarroModel } from '../../models/carro-model';

export interface LoadCarroByClienteId {
    loadByClienteId: (id: number) => Promise<CarroModel[]>;
}
