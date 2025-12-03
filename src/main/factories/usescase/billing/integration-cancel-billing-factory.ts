import { CancelBillingIntegration } from '@/data/protocols/client/billing-service/cancel-billing-integration';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationCancelBilling } from '@/data/usecases/billing/integration-cancel-billing';

export const makeIntegrationCancelBilling = (): CancelBillingIntegration => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationCancelBilling(billingServiceIntegration);
};
