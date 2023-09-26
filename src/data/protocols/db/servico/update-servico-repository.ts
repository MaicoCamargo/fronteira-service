import { DbServicoModel } from '../../../models/db-servico-model';

export type UpdateServicoModel = Omit<DbServicoModel, 'data'>;

export interface UpdateServicoRepository {
    update: (model: UpdateServicoModel) => Promise<DbServicoModel>;
}
