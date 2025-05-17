import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { SaveSimpleBillingController } from '@/presentation/controllers/billing/save-simple-billing-controller';
import { makeIntegrationSaveSimpleBilling } from '@/main/factories/usescase/billing/integration-save-simple-billing-factory';

export const makeSaveSimpleBillingController = (): Controller => {
    return makeLogControllerDecorator(new SaveSimpleBillingController(makeIntegrationSaveSimpleBilling()));
};
