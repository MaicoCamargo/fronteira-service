import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { CredencialModel, LoadAuthIntegration } from '@/data/protocols/client/auth-service/load-auth-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class AuthServiceIntegration implements LoadAuthDetailIntegration, LoadAuthIntegration {
    constructor(private readonly axios: AxiosHelper) {}

    async load(token: string): Promise<any> {
        const config = {
            headers: {
                Authorization: token
            }
        };
        return await this.axios.get('/auth', config);
    }

    async auth(credencial: CredencialModel): Promise<Wrapper<string>> {
        return await this.axios.post('/auth', credencial);
    }
}
