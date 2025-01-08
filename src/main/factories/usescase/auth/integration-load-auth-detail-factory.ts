import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';

export const makeIntegrationLoadAuthDetail = (): AuthServiceIntegration => {
    return new AuthServiceIntegration();
};
