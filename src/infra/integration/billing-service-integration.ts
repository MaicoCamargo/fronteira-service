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
import { UpdateSimpleBillingIntegration } from '@/data/protocols/client/billing-service/update-simple-billing-integration';
import { httpRequestScope } from '@/infra/http/http-request-scope';
import { CancelBillingIntegration } from '@/data/protocols/client/billing-service/cancel-billing-integration';

export class BillingServiceIntegration
    implements
        SaveSimpleBillingIntegration,
        LoadBillingsIntegration,
        UpdateBillingPaymentIntegration,
        LoadBillingByOrderIdIntegration,
        UpdateSimpleBillingIntegration,
        CancelBillingIntegration
{
    constructor(private readonly axios: AxiosHelper) {}

    async save(data: SaveSimpleBillingIntegrationModel): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        this.headers();
        return await this.axios.post('/billings/simple', data);
    }

    async load(
        loadBillingsIntegrationParams: LoadBillingsIntegrationParams
    ): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
        if (loadBillingsIntegrationParams.page) {
            loadBillingsIntegrationParams.page = loadBillingsIntegrationParams.page - 1;
        }
        this.headers();
        return (await this.axios.get(`/billings/service/${ENV.SERVICE.ID}`, loadBillingsIntegrationParams)) as Wrapper<
            IntegrationLoadSimpleBillingModel[]
        >;
    }

    async updatePayment(
        payment: UpdateBillingPaymentIntegrationModel
    ): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        this.headers();
        return await this.axios.put('/payments', payment);
    }

    async loadByOrderId(order: number): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
        this.headers();
        return (await this.axios.get(`/billings/order/${order}`)) as Wrapper<IntegrationLoadSimpleBillingModel[]>;
    }

    async update(
        id: number,
        billing: SaveSimpleBillingIntegrationModel
    ): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        this.headers();
        return await this.axios.put(`/billings/${id}`, billing);
    }

    async cancel(code: string): Promise<void> {
        return await this.axios.patch(`/billings/${code}/cancel`);
    }

    private headers(): void {
        this.axios.setHeader('X-Client-ID', httpRequestScope.getStore()?.clientId);
    }
}
