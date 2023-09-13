import { DbCarroModel } from '../../../models/db-carro-model';

export interface LoadCarroByClienteIdRepository {
    loadByClienteId: (id: number) => Promise<DbCarroModel[]>;
}
