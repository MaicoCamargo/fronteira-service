import { DbClienteModel } from '../../../models/db-cliente-model';

export interface LoadClientesRepository {
    load: () => Promise<DbClienteModel[]>;
}
