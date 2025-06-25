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
import { ENV } from '@/main/config/env';
import {
    UpdateBillingPaymentIntegration,
    UpdateBillingPaymentIntegrationModel
} from '@/data/protocols/client/billing-service/update-billing-payment-integration';
import { LoadBillingByOrderIdIntegration } from '@/data/protocols/client/billing-service/load-billing-by-order-id-integration';

export class BillingServiceIntegration
    implements
        SaveSimpleBillingIntegration,
        LoadBillingsIntegration,
        UpdateBillingPaymentIntegration,
        LoadBillingByOrderIdIntegration
{
    constructor(private readonly axios: AxiosHelper) {}

    async save(data: SaveSimpleBillingIntegrationModel): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        return await this.axios.post('/billings/simple', data);
    }

    async load(params: LoadBillingsIntegrationParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
        return (await this.axios.get(`/billings/service/${ENV.SERVICE.ID}`, params)) as Wrapper<
            IntegrationLoadSimpleBillingModel[]
        >;
    }

    async update(payment: UpdateBillingPaymentIntegrationModel): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        return await this.axios.put('/payments', payment);
    }

    async loadByOrderId(order: number): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
        return (await this.axios.get(`/billings/order/${order}`)) as Wrapper<IntegrationLoadSimpleBillingModel[]>;
    }
}
