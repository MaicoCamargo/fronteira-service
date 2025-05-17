import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { IntegrationLoadAuthDetail } from '@/data/usecases/auth/integration-load-auth-detail';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';

export const makeIntegrationLoadAuthDetail = (): IntegrationLoadAuthDetail => {
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    return new IntegrationLoadAuthDetail(authServiceIntegration);
};
