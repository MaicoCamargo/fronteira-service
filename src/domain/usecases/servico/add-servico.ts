import { ServicoModel } from '../../models/servico-model';

export type AddServicoParams = Omit<ServicoModel, 'id'>;

export interface AddServico {
    add: (params: AddServicoParams) => Promise<ServicoModel>;
}
