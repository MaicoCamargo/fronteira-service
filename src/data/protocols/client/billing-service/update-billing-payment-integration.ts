import { Wrapper } from '@/main/protocols/http-wrapper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export enum BillingPaymentTypeIntegrationModel {
    CASH_ON_DELIVERY, // Dinheiro á vista
    DEBIT_CARD,
    CREDIT_CARD
}

export enum BillingPaymentStatusIntegrationModel {
    PENDING, // Pagamento pendente
    COMPLETED, // Pagamento concluído
    FAILED, // Pagamento falhou
    LATE, // Pagamento atrasado
    CANCELED, // Pagamento cancelado
    REFUND, // Pagamento estornado
    IN_PROGRESS // Pagamento em andamento
}

export interface UpdateBillingPaymentIntegrationModel {
    id: number;
    status: BillingPaymentStatusIntegrationModel;
    value: number;
    type: BillingPaymentTypeIntegrationModel;
}

export interface UpdateBillingPaymentIntegration {
    updatePayment: (
        billing: UpdateBillingPaymentIntegrationModel
    ) => Promise<Wrapper<IntegrationLoadSimpleBillingModel>>;
}
