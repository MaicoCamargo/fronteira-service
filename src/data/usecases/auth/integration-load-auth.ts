import { Wrapper } from '@/main/protocols/http-wrapper';
import { CredencialParams, LoadAuth } from '@/domain/usecases/auth/load-auth';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { LoadProfileByUsername } from '@/domain/usecases/profile/load-profile-by-username';
import { InvalidCredentialsError } from '@/presentation/errors';
import { LoadProfileByMail } from '@/domain/usecases/profile/load-profile-by-mail';
import { ProfileModel } from '@/domain/models/profile-model';
import { ENV, GUEST_CLIENT_ID } from '@/main/config/env';
import { AuthModel } from '@/domain/models/auth-model';
import { RequestScopeRepository } from '@/data/protocols/scope/request-scope-repository';

export class IntegrationLoadAuth implements LoadAuth {
    constructor(
        private readonly loadAuthIntegration: LoadAuthIntegration,
        private readonly loadProfileByUsername: LoadProfileByUsername,
        private readonly loadProfileByMail: LoadProfileByMail,
        private readonly requestScopeRepository: RequestScopeRepository
    ) {}

    async auth(credencial: CredencialParams): Promise<Wrapper<AuthModel>> {
        const clientId = await this.loadClientId(credencial);
        if (!clientId) {
            throw new InvalidCredentialsError();
        }
        this.requestScopeRepository.enterWith({ clientId });
        const wrapper: Wrapper<string> = await this.loadAuthIntegration.auth({
            login: credencial.username,
            password: credencial.password
        });
        return {
            content: {
                jwt: wrapper.content,
                clientId
            }
        };
    }

    /**
     * This method loads the client ID based on the provided credentials. It iterates through the ENV.TENANTS array to find a match. If found, it sets the httpRequestScope with the corresponding CLIENT_ID and returns it. If not found, it returns null.

     * @param {CredencialParams} credencial - The credentials object containing username and password or email.
     *
     * @return {Promise<string>} Promise that resolves to the client ID string if found, otherwise null.
     */
    private async loadClientId(credencial: CredencialParams): Promise<string> {
        const tenants = [...ENV.TENANTS, { SCHEMA: 'public', CLIENT_ID: GUEST_CLIENT_ID }];
        for (const tenantsKey of tenants) {
            this.requestScopeRepository.enterWith({ clientId: tenantsKey.CLIENT_ID });
            const [profileFromUsername, profileFromMail] = await Promise.all([
                this.loadProfileByUsername.load(credencial.username).catch(() => null),
                this.loadProfileByMail.load(credencial.username).catch(() => null)
            ]);
            const profile: ProfileModel = profileFromUsername || profileFromMail;
            if (profile) {
                return tenantsKey.CLIENT_ID;
            }
        }
        return null;
    }
}
