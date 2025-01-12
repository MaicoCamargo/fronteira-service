import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { AuthDetailController } from '@/presentation/controllers/auth/auth-detail-controller';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';

export const makeAuthDetailController = (): Controller => {
    return makeLogControllerDecorator(new AuthDetailController(makeIntegrationLoadAuthDetail()));
};
