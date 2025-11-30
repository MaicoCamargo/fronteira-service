import { DbAddServico } from '@/data/usecases/servico/db-add-servico';
import { ServicoPgRepository } from '@/infra/db/pg/servico-pg-repository';
import { IncludedItemPgRepository } from '@/infra/db/pg/included-item-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';

export const makeDbAddServico = (): DbAddServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();
    const mechanicPgRepository = new MechanicPgRepository();
    const carroPgRepository = new CarroPgRepository();
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    const loadAuthDetailIntegration = makeIntegrationLoadAuthDetail();
    const profilePgRepository = new ProfilePgRepository();

    return new DbAddServico(
        servicoPgRepository,
        includedItemPgRepository,
        notaFiscalPgRepository,
        notaFiscalPgRepository,
        mechanicPgRepository,
        carroPgRepository,
        billingServiceIntegration,
        loadAuthDetailIntegration,
        profilePgRepository
    );
};
