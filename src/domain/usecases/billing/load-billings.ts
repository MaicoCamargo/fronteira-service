import { Wrapper } from '@/main/protocols/http-wrapper';
import { BillingModel } from '@/domain/models/billing-model';

export interface LoadBillingsParams {
    service: number;
    status: string;
    order: number;
    user: number;
}

export interface LoadBillings {
    load: (params: LoadBillingsParams) => Promise<Wrapper<BillingModel[]>>;
}
