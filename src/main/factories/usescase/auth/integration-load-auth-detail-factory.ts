import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { IntegrationLoadAuthDetail } from '@/data/usecases/auth/integration-load-auth-detail';

export const makeIntegrationLoadAuthDetail = (): IntegrationLoadAuthDetail => {
    const authServiceIntegration = new AuthServiceIntegration();
    return new IntegrationLoadAuthDetail(authServiceIntegration);
};
