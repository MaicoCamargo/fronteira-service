import { DbServicoModel } from '../../../models/db-servico-model';

export type SaveServicoModel = Omit<DbServicoModel, 'id_servico'>;

export interface SaveServicoRepository {
    save: (model: SaveServicoModel) => Promise<DbServicoModel>;
}
