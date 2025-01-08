import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';

export class AuthServiceIntegration implements LoadAuthDetailIntegration {
    async load(token: string): Promise<any> {
        const config = {
            headers: {
                Authorization: token
            }
        };
        return await AxiosHelper.get('/auth', config);
    }
}
