import { IncludedItemModel, ServicoModel } from '../../models/servico-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

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

export interface AddPaymentParams {
    installments: number;
    value: number;
    status: PaymentStatus;
    type: PaymentType;
}

export interface AddBillingParams {
    description: string;
    amount: number;
    payments: AddPaymentParams[];
}

export type AddServicoParams = Omit<ServicoModel, 'id' | 'data' | 'lastUpdate' | 'mecanicos' | 'billing' | 'code'> & {
    mechanics?: number[];
    billing?: AddBillingParams;
};

export interface AddServico {
    add: (params: AddServicoParams) => Promise<Wrapper<ServicoModel>>;
}
