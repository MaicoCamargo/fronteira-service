import { Wrapper } from '@/main/protocols/http-wrapper';

export interface LoadBillingsParams {
    service: number;
    status: string;
    order: number;
    user: number;
}

export interface LoadBillings {
    load: (params: LoadBillingsParams) => Promise<Wrapper<BillingModel[]>>;
}
