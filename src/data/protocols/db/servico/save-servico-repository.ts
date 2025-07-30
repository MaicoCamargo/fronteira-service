import { DbServicoModel } from '@/data/models/db-servico-model';

export type SaveServicoModel = Omit<DbServicoModel, 'id_servico' | 'data' | 'last_updated' | 'codigo'> & {
    code: string;
};

export interface SaveServicoRepository {
    save: (model: SaveServicoModel) => Promise<DbServicoModel>;
}
