import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeIntegrationUpdateBillingPayment } from '@/main/factories/usescase/billing/integration-update-billing-payment-factory';
import { UpdateBillingPaymentController } from '@/presentation/controllers/billing/update-billing-payment-controller';

export const makeUpdateBillingPaymentController = (): Controller => {
    return makeLogControllerDecorator(new UpdateBillingPaymentController(makeIntegrationUpdateBillingPayment()));
};
