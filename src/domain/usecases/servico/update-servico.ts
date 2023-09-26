import { ServicoModel } from '../../models/servico-model';

export type UpdateServicoParams = Omit<ServicoModel, 'data'>;

export interface UpdateServico {
    update: (params: UpdateServicoParams) => Promise<ServicoModel>;
}
