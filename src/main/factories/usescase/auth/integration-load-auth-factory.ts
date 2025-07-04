import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { IntegrationLoadAuth } from '@/data/usecases/auth/integration-load-auth';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';

export const makeIntegrationLoadAuth = (): IntegrationLoadAuth => {
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    return new IntegrationLoadAuth(authServiceIntegration);
};
