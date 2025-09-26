import { Wrapper } from '@/main/protocols/http-wrapper';
import { CredencialParams, LoadAuth } from '@/domain/usecases/auth/load-auth';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { LoadProfileByUsername } from '@/domain/usecases/profile/load-profile-by-username';
import { InvalidCredentialsError } from '@/presentation/errors';
import { LoadProfileByMail } from '@/domain/usecases/profile/load-profile-by-mail';

export class IntegrationLoadAuth implements LoadAuth {
    constructor(
        private readonly loadAuthIntegration: LoadAuthIntegration,
        private readonly loadProfileByUsername: LoadProfileByUsername,
        private readonly loadProfileByMail: LoadProfileByMail
    ) {}

    async auth(credencial: CredencialParams): Promise<Wrapper<string>> {
        const [profileFromUsername, profileFromMail] = await Promise.all([
            this.loadProfileByUsername.load(credencial.username).catch(() => null),
            this.loadProfileByMail.load(credencial.username).catch(() => null)
        ]);

        const profile = profileFromUsername || profileFromMail;

        if (!profile) {
            throw new InvalidCredentialsError();
        }

        return await this.loadAuthIntegration.auth({ login: credencial.username, password: credencial.password });
    }
}
