import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoadBillingsController } from '@/presentation/controllers/billing/load-billings-controller';
import { makeIntegrationLoadBillings } from '@/main/factories/usescase/billing/integration-load-billings-factory';

export const makeLoadBillingsController = (): Controller => {
    return makeLogControllerDecorator(new LoadBillingsController(makeIntegrationLoadBillings()));
};
