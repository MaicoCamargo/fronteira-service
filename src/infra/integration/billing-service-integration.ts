import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export class BillingServiceIntegration implements SaveSimpleBillingIntegration {
    constructor(private readonly axios: AxiosHelper) {}

    async save(data: SaveSimpleBillingIntegrationModel): Promise<IntegrationLoadSimpleBillingModel> {
        return await this.axios.post('/billings/simple', data);
    }
}
