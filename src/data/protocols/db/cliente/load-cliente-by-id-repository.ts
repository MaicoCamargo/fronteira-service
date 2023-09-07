import { DbClienteModel } from '../../../models/db-cliente-model';

export interface LoadClienteByIdRepository {
    loadById: (id: number) => Promise<DbClienteModel>;
}
