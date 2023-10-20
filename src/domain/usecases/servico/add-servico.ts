import { IncludedItemModel, ServicoModel } from '../../models/servico-model';

export type AddItemParams = Required<IncludedItemModel>;

export type AddServicoParams = Omit<ServicoModel, 'id' | 'data' | 'lastUpdate'>;

export interface AddServico {
    add: (params: AddServicoParams) => Promise<ServicoModel>;
}
