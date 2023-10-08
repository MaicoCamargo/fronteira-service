import { IncludedItemModel, ServicoModel } from '../../models/servico-model';

export type AddItemParams = Omit<IncludedItemModel, 'id'>;

export type AddServicoParams = Omit<ServicoModel, 'id' | 'data' | 'lastUpdate' | 'itens'> & { itens: AddItemParams[] };

export interface AddServico {
    add: (params: AddServicoParams) => Promise<ServicoModel>;
}
