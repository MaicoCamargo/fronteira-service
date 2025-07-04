import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationUpdateSimpleBilling } from '@/data/usecases/billing/integration-update-simple-billing';

export const makeIntegrationUpdateSimpleBilling = (): IntegrationUpdateSimpleBilling => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationUpdateSimpleBilling(billingServiceIntegration);
};
