import { IntegrationSaveSimpleBilling } from '@/data/usecases/billing/integration-save-simple-billing';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';

export const makeIntegrationSaveSimpleBilling = (): IntegrationSaveSimpleBilling => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationSaveSimpleBilling(billingServiceIntegration);
};
