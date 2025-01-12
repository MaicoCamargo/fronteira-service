import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { AuthController } from '@/presentation/controllers/auth/auth-controller';
import { makeIntegrationLoadAuth } from '@/main/factories/usescase/auth/integration-load-auth-factory';

export const makeAuthController = (): Controller => {
    return makeLogControllerDecorator(new AuthController(makeIntegrationLoadAuth()));
};
