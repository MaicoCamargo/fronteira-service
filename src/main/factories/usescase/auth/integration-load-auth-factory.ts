import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';

export const makeIntegrationLoadAuth = (): AuthServiceIntegration => {
    return new AuthServiceIntegration();
};
