import { DbClienteModel } from '../../../models/db-cliente-model';
import { Wrapper } from '../../../../presentation/protocols/http/http-wrapper';

export interface LoadClientesRepository {
    load: (page?: number, limit?: number) => Promise<Wrapper<DbClienteModel[]>>;
}
