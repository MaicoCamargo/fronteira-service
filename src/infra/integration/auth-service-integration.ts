import {
    LoadAuthDetailIntegration,
    LoadAuthDetailIntegrationModel
} from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { CredencialModel, LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { httpRequestScope } from '@/infra/http/http-request-scope';

export class AuthServiceIntegration implements LoadAuthDetailIntegration, LoadAuthIntegration {
    constructor(private readonly axios: AxiosHelper) {}

    async load(token: string): Promise<Wrapper<LoadAuthDetailIntegrationModel>> {
        const config = {
            headers: {
                Authorization: token,
                'X-Client-ID': this.getClientId()
            }
        };
        return await this.axios.get('/auth', null, config);
    }

    async auth(credencial: CredencialModel): Promise<Wrapper<string>> {
        const config = {
            headers: {
                'X-Client-ID': this.getClientId()
            }
        };
        return await this.axios.post('/auth', credencial, config);
    }

    private getClientId(): string {
        return httpRequestScope.getStore()?.clientId || null;
    }
}
