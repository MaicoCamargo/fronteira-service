import { Wrapper } from '@/main/protocols/http-wrapper';
import { SaveSimpleBillingIntegration } from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';

export class BillingServiceIntegration implements SaveSimpleBillingIntegration {
    constructor(private readonly axios: AxiosHelper) {}

    async save(data: any): Promise<Wrapper<string>> {
        return await this.axios.post('/billings/simple', data);
    }
}
