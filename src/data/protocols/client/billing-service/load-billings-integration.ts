import { Wrapper } from '@/main/protocols/http-wrapper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export interface LoadBillingsIntegrationParams {
    status?: string;
    startDate?: string;
    endDate?: string;
    user?: number;
    page?: number;
    size?: number;
    order?: number;
    code?: string;
}

export interface LoadBillingsIntegration {
    load: (params: LoadBillingsIntegrationParams) => Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>>;
}
