import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

export enum PaymentTypeParams {
    CASH_ON_DELIVERY = 1, // Dinheiro á vista
    DEBIT_CARD = 2,
    CREDIT_CARD = 3
}

export enum PaymentStatusParams {
    PENDING = 1, // Pagamento pendente
    COMPLETED = 2, // Pagamento concluído
    FAILED = 3, // Pagamento falhou
    LATE = 4, // Pagamento atrasado
    CANCELED = 5, // Pagamento cancelado
    REFUND = 6, // Pagamento estornado
    IN_PROGRESS = 7 // Pagamento em andamento
}

export interface UpdateBillingPaymentParams {
    id: number;
    status: PaymentStatusParams;
    value: number;
    type: PaymentTypeParams;
}

export interface UpdateBillingPayment {
    update: (billing: UpdateBillingPaymentParams) => Promise<Wrapper<IntegrationLoadSimpleBillingModel>>;
}
