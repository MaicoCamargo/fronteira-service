import { DbServicoModel } from '../../../models/db-servico-model';

export interface LoadServicosRepository {
    load: () => Promise<DbServicoModel[]>;
}
