import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationUpdateSimpleBilling } from '@/data/usecases/billing/integration-update-simple-billing';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { HttpRequestScopeRepository } from '@/infra/http/request-scope-repository';

export const makeIntegrationUpdateSimpleBilling = (): IntegrationUpdateSimpleBilling => {
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    const loadAuthDetailIntegration = makeIntegrationLoadAuthDetail();
    const profilePgRepository = new ProfilePgRepository();

    return new IntegrationUpdateSimpleBilling(
        billingServiceIntegration,
        loadAuthDetailIntegration,
        profilePgRepository,
        new HttpRequestScopeRepository()
    );
};
