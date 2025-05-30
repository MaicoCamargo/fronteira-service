import { Wrapper } from '@/main/protocols/http-wrapper';
import { BillingModel } from '@/domain/models/billing-model';
import { PageFilter } from '@/main/protocols/page-filter';

export interface LoadBillingsParams extends PageFilter {
    service: number;
    status: string;
    order: number;
    user: number;
}

export interface LoadBillings {
    load: (params: LoadBillingsParams) => Promise<Wrapper<BillingModel[]>>;
}
