import { Wrapper } from '@/main/protocols/http-wrapper';
import { CredencialParams, LoadAuth } from '@/domain/usecases/auth/load-auth';
import { LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';

export class IntegrationLoadAuth implements LoadAuth {
    constructor(private readonly loadAuthIntegration: LoadAuthIntegration) {}

    async auth(credencial: CredencialParams): Promise<Wrapper<string>> {
        return await this.loadAuthIntegration.auth({ login: credencial.username, password: credencial.password });
    }
}
