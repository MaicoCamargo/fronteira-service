import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { IntegrationLoadAuth } from '@/data/usecases/auth/integration-load-auth';

export const makeIntegrationLoadAuth = (): IntegrationLoadAuth => {
    const authServiceIntegration = new AuthServiceIntegration();
    return new IntegrationLoadAuth(authServiceIntegration);
};
