import { DbSaveTryOut } from '@/data/usecases/db-save-try-out';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';

export const makeDbSaveTryOut = (): DbSaveTryOut => {
    const profilePgRepository = new ProfilePgRepository();
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    return new DbSaveTryOut(profilePgRepository, authServiceIntegration);
};
