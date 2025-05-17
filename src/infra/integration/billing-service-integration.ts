import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import {
    LoadBillingsIntegration,
    LoadBillingsIntegrationParams
} from '@/data/protocols/client/billing-service/load-billings-integration';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class BillingServiceIntegration implements SaveSimpleBillingIntegration, LoadBillingsIntegration {
    constructor(private readonly axios: AxiosHelper) {}

    async save(data: SaveSimpleBillingIntegrationModel): Promise<IntegrationLoadSimpleBillingModel> {
        return await this.axios.post('/billings/simple', data);
    }

    async load(params: LoadBillingsIntegrationParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
        return await this.axios.get(`/billings/service/${params.service}`, params);
    }
}
