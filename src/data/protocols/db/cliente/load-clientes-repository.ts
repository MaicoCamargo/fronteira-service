import { DbClienteModel } from '../../../models/db-cliente-model';
import { Wrapper } from '../../../../main/protocols/http-wrapper';

export interface LoadClientesRepository {
    load: (page?: number, limit?: number) => Promise<Wrapper<DbClienteModel[]>>;
}
