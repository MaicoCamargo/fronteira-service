import { DbLoadMechanicShopByOwnerId } from '@/data/usecases/mechanic-shop/db-load-mechanic-shop-by-owner-id';
import { MechanicShopPgRepository } from '@/infra/db/pg/mechanic-shop-pg-repository';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';
import { EnderecoPgRepository } from '@/infra/db/pg/endereco-pg-repository';

export const makeDbLoadMechanicShopByOwnerId = (): DbLoadMechanicShopByOwnerId => {
    const mechanicShopPgRepository = new MechanicShopPgRepository();
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    const profilePgRepository = new ProfilePgRepository();
    const enderecoPgRepository = new EnderecoPgRepository();
    return new DbLoadMechanicShopByOwnerId(
        mechanicShopPgRepository,
        authServiceIntegration,
        profilePgRepository,
        enderecoPgRepository
    );
};
