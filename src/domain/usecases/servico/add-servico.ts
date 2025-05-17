import { IncludedItemModel, ServicoModel } from '../../models/servico-model';

export type AddItemParams = Required<IncludedItemModel>;

export interface Payment {
    installments: number;
    value: number;
    status: string;
    type: string;
}

export interface Billing {
    description: string;
    amount: number;
    payments: Payment[];
}

export type AddServicoParams = Omit<ServicoModel, 'id' | 'data' | 'lastUpdate' | 'mecanicos'> & {
    mechanics?: number[];
    billing?: Billing;
};

export interface AddServico {
    add: (params: AddServicoParams) => Promise<ServicoModel>;
}
