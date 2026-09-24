import { DbSaveTryOut } from '@/data/usecases/db-save-try-out';
import { ProfilePgRepository } from '@/infra/db/pg/profile-pg-repository';
import { AuthServiceIntegration } from '@/infra/integration/auth-service-integration';
import { makeAuthServiceClient } from '@/main/factories/infra/integration/auth-service-client-factory';
import { HttpRequestScopeRepository } from '@/infra/http/request-scope-repository';

export const makeDbSaveTryOut = (): DbSaveTryOut => {
    const profilePgRepository = new ProfilePgRepository();
    const authServiceIntegration = new AuthServiceIntegration(makeAuthServiceClient());
    return new DbSaveTryOut(profilePgRepository, authServiceIntegration, new HttpRequestScopeRepository());
};
