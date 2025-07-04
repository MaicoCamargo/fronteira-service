import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationLoadBillings } from '@/data/usecases/billing/integration-load-billings';

export const makeIntegrationLoadBillings = (): IntegrationLoadBillings => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationLoadBillings(billingServiceIntegration);
};
