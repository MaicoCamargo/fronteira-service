import { TryOut, TryOutParams } from '@/domain/usecases/try-out';
import { AuthModel } from '@/domain/models/auth-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { SaveProfileModel, SaveProfileRepository } from '@/data/protocols/db/profile/save-profile-repository';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { RequestScopeRepository } from '@/data/protocols/scope/request-scope-repository';
import { GUEST_CLIENT_ID } from '@/main/config/env';

export class DbSaveTryOut implements TryOut {
    constructor(
        private readonly saveProfileRepository: SaveProfileRepository,
        private readonly loadAuthIntegration: LoadAuthIntegration,
        private readonly requestScopeRepository: RequestScopeRepository
    ) {}

    async try(tryOutParams: TryOutParams): Promise<Wrapper<AuthModel>> {
        const unique = `guest_${tryOutParams.name.toLowerCase().replaceAll(' ', '').trim()}_${new Date().getTime()}`;
        const guest: SaveProfileModel = {
            username: unique,
            contact: tryOutParams.contact,
            firstName: tryOutParams.name,
            nickname: 'convidado',
            mail: unique + '@guest.com'
        };
        // todo create guest with mechanic position
        const clientId = GUEST_CLIENT_ID;
        this.requestScopeRepository.enterWith({ clientId });
        await this.saveProfileRepository.save(guest);
        const wrapper = await this.loadAuthIntegration.auth({ login: 'guest', password: 'acesso#guest' });
        return { content: { jwt: wrapper.content, clientId } };
    }
}
