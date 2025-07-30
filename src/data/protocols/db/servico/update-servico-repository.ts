import { DbServicoModel } from '../../../models/db-servico-model';

export type UpdateServicoModel = Omit<DbServicoModel, 'data' | 'last_updated' | 'codigo'>;

export interface UpdateServicoRepository {
    update: (model: UpdateServicoModel) => Promise<DbServicoModel>;
}
