import { IncludedItemModel, ServicoModel } from '../../models/servico-model';

export type AddItemParams = Required<IncludedItemModel>;

export enum PaymentStatus {
    PENDING = 1, // Pagamento pendente
    COMPLETED, // Pagamento concluído
    FAILED, // Pagamento falhou
    LATE, // Pagamento atrasado
    CANCELED, // Pagamento cancelado
    REFUND, // Pagamento estornado
    IN_PROGRESS // Pagamento em andamento
}
export enum PaymentType {
    CASH_ON_DELIVERY = 1, // Dinheiro á vista
    DEBIT_CARD,
    CREDIT_CARD,
    BANK_SLIP, // boleto
    INSTALLMENT_CASH
}

export interface Payment {
    installments: number;
    value: number;
    status: PaymentStatus;
    type: PaymentType;
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
