import { LoadAuthDetail } from '@/domain/usecases/auth/load-auth-detail';
import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { AuthDetailModel } from '@/domain/models/auth-detail-model';

export class IntegrationLoadAuthDetail implements LoadAuthDetail {
    constructor(private readonly loadAccessDetailIntegration: LoadAuthDetailIntegration) {}

    async load(token: string): Promise<Wrapper<AuthDetailModel>> {
        const promise = await this.loadAccessDetailIntegration.load(token);
        return await Promise.resolve(promise);
    }
}
