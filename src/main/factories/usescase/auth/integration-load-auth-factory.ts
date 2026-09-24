import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { IntegrationLoadAuth } from '@/data/usecases/auth/integration-load-auth';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';
import { makeDbLoadProfileByUsername } from '@/main/factories/usescase/profile/db-load-profile-by-username-factory';
import { makeDbLoadProfileByMail } from '@/main/factories/usescase/profile/db-load-profile-by-mail-factory';
import { HttpRequestScopeRepository } from '@/infra/http/request-scope-repository';

export const makeIntegrationLoadAuth = (): IntegrationLoadAuth => {
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    const loadProfileByUsername = makeDbLoadProfileByUsername();
    const loadProfileByMail = makeDbLoadProfileByMail();
    return new IntegrationLoadAuth(
        authServiceIntegration,
        loadProfileByUsername,
        loadProfileByMail,
        new HttpRequestScopeRepository()
    );
};
