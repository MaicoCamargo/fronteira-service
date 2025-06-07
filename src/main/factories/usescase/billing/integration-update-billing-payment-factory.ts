import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationUpdateBillingPayment } from '@/data/usecases/billing/integration-update-billing-payment';

export const makeIntegrationUpdateBillingPayment = (): IntegrationUpdateBillingPayment => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationUpdateBillingPayment(billingServiceIntegration);
};
