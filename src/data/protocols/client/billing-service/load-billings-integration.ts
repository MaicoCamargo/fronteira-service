import { Wrapper } from '@/main/protocols/http-wrapper';

export interface LoadBillingsIntegrationParams {
    service: number;
    status: string;
    order: number;
    user: number;
}

export interface LoadBillingsIntegration {
    load: (params: LoadBillingsIntegrationParams) => Promise<Wrapper<string>>;
}
