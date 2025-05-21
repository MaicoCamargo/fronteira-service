import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

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

export interface SaveSimplePayment {
    installments: number;
    value: number;
    status: PaymentStatus;
    type: PaymentType;
}

export interface SaveSimpleBillingParams {
    name: string;
    description: string;
    payments: SaveSimplePayment[];
    amount: number;
    order: number;
}

export interface SaveSimpleBilling {
    save: (billing: SaveSimpleBillingParams) => Promise<IntegrationLoadSimpleBillingModel>;
}
