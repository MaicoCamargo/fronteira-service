import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeIntegrationUpdateSimpleBilling } from '@/main/factories/usescase/billing/integration-update-simple-billing-factory';
import { UpdateSimpleBillingController } from '@/presentation/controllers/billing/update-simple-billing-controller';

export const makeUpdateSimpleBillingController = (): Controller => {
    return makeLogControllerDecorator(new UpdateSimpleBillingController(makeIntegrationUpdateSimpleBilling()));
};
