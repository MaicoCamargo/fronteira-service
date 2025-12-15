import { DbUpdateServico } from '@/data/usecases/servico/db-update-servico';
import { ServicoPgRepository } from '@/infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';
import { ClientePgRepository } from '@/infra/db/pg/cliente-pg-repository';
import { IncludedItemPgRepository } from '@/infra/db/pg/included-item-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeBillingServiceClient } from '@/main/factories/infra/integration/billing-service-client-factory';
import { makeIntegrationCancelBilling } from '@/main/factories/usescase/billing/integration-cancel-billing-factory';
import { makeIntegrationLoadAuthDetail } from '@/main/factories/usescase/auth/integration-load-auth-detail-factory';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbUpdateServico = (): DbUpdateServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    const clientePgRepository = new ClientePgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();
    const mechanicPgRepository = new MechanicPgRepository();
    const cancelBillingIntegration = makeIntegrationCancelBilling();
    const loadAuthDetailIntegration = makeIntegrationLoadAuthDetail();
    const profilePgRepository = new ProfilePgRepository();
    const billingServiceIntegration = new BillingServiceIntegration(makeBillingServiceClient());
    const redisCacheRepository = new RedisCacheRepository();
    return new DbUpdateServico(
        servicoPgRepository,
        clientePgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        notaFiscalPgRepository,
        notaFiscalPgRepository,
        mechanicPgRepository,
        carroPgRepository,
        cancelBillingIntegration,
        billingServiceIntegration,
        loadAuthDetailIntegration,
        profilePgRepository,
        redisCacheRepository
    );
};
