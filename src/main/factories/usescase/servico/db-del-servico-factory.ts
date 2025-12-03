import { DbDeleteServico } from '../../../../data/usecases/servico/db-delete-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';

export const makeDbDelServico = (): DbDeleteServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    return new DbDeleteServico(servicoPgRepository, billingServiceIntegration);
};
