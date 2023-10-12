import { DbItemModel } from '../../../models/db-item-model';

export interface LoadItensByServicoRepository {
    loadByServico: (servicoId: number) => Promise<DbItemModel[]>;
}
