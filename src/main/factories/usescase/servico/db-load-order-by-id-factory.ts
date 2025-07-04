import { ServicoPgRepository } from '@/infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';
import { IncludedItemPgRepository } from '@/infra/db/pg/included-item-pg-repository';
import { ClientePgRepository } from '@/infra/db/pg/cliente-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { DbLoadOrderById } from '@/data/usecases/servico/db-load-order-by-id';

export const makeDbLoadOrderById = (): DbLoadOrderById => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const clientePgRepository = new ClientePgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();
    const mechanicPgRepository = new MechanicPgRepository();
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());

    return new DbLoadOrderById(
        servicoPgRepository,
        carroPgRepository,
        includedItemPgRepository,
        clientePgRepository,
        mechanicPgRepository,
        billingServiceIntegration,
        notaFiscalPgRepository
    );
};
