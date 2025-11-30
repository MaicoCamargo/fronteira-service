import { IntegrationSaveSimpleBilling } from '@/data/usecases/billing/integration-save-simple-billing';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';

export const makeIntegrationSaveSimpleBilling = (): IntegrationSaveSimpleBilling => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    const loadAuthDetailIntegration = makeIntegrationLoadAuthDetail();
    const profilePgRepository = new ProfilePgRepository();

    return new IntegrationSaveSimpleBilling(billingServiceIntegration, loadAuthDetailIntegration, profilePgRepository);
};
