import { Wrapper } from '@/main/protocols/http-wrapper';
import { CredencialParams, LoadAuth } from '@/domain/usecases/auth/load-auth';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { LoadProfileByUsername } from '@/domain/usecases/profile/load-profile-by-username';
import { InvalidCredentialsError } from '@/presentation/errors';
import { LoadProfileByMail } from '@/domain/usecases/profile/load-profile-by-mail';
import { httpRequestScope } from '@/infra/http/http-request-scope';
import { ProfileModel } from '@/domain/models/profile-model';
import { ENV } from '@/main/config/env';
import { AuthModel } from '@/domain/models/auth-model';

export class IntegrationLoadAuth implements LoadAuth {
    constructor(
        private readonly loadAuthIntegration: LoadAuthIntegration,
        private readonly loadProfileByUsername: LoadProfileByUsername,
        private readonly loadProfileByMail: LoadProfileByMail
    ) {}

    async auth(credencial: CredencialParams): Promise<Wrapper<AuthModel>> {
        if (!(await this.loadProfileInAllTenants(credencial))) {
            throw new InvalidCredentialsError();
        }
        const wrapper: Wrapper<string> = await this.loadAuthIntegration.auth({
            login: credencial.username,
            password: credencial.password
        });
        return {
            content: {
                jwt: wrapper.content,
                clientId: httpRequestScope.getStore().clientId
            }
        };
    }

    /**
     * Loads a user's profile in all available tenants.
     * @param {CredencialParams} credencial - An object containing the username and password for authentication.
     * @returns {Promise<ProfileModel>} - A promise that resolves to the loaded profile, or null if no matching profile is found.
     */
    private async loadProfileInAllTenants(credencial: CredencialParams): Promise<ProfileModel> {
        const tenants = [...ENV.TENANTS, { SCHEMA: 'public', CLIENT_ID: null }];
        for (const tenantsKey of tenants) {
            httpRequestScope.enterWith({ clientId: tenantsKey.CLIENT_ID, authorization: null });
            const [profileFromUsername, profileFromMail] = await Promise.all([
                this.loadProfileByUsername.load(credencial.username).catch(() => null),
                this.loadProfileByMail.load(credencial.username).catch(() => null)
            ]);
            const profile: ProfileModel = profileFromUsername || profileFromMail;
            if (profile) {
                return profile;
            }
        }
        console.log('null', credencial.username);
        return null;
    }
}
