import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { IntegrationLoadBillings } from '@/data/usecases/billing/integration-load-billings';
import { ServicoPgRepository } from '@/infra/db/pg/servico-pg-repository';

export const makeIntegrationLoadBillings = (): IntegrationLoadBillings => {
    const servicoPgRepository = new ServicoPgRepository();
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new IntegrationLoadBillings(billingServiceIntegration, servicoPgRepository);
};
