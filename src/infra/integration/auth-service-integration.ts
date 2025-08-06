import {
    LoadAuthDetailIntegration,
    LoadAuthDetailIntegrationModel
} from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { CredencialModel, LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { ENV } from '@/main/config/env';

export class AuthServiceIntegration implements LoadAuthDetailIntegration, LoadAuthIntegration {
    constructor(private readonly axios: AxiosHelper) {
        this.axios.setHeader('X-Client-ID', ENV.AUTH_SERVICE_CLIENT_ID);
    }

    async load(token: string): Promise<Wrapper<LoadAuthDetailIntegrationModel>> {
        const config = {
            headers: {
                Authorization: token
            }
        };
        return await this.axios.get('/auth', null, config);
    }

    async auth(credencial: CredencialModel): Promise<Wrapper<string>> {
        return await this.axios.post('/auth', credencial);
    }
}
