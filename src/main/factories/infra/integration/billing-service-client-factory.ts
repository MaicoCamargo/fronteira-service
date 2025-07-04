import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';

export const makeBillingServiceClient = (): AxiosHelper => {
    return AxiosHelper.getInstance(ENV.BILLING_SERVICE_HOST, 'Billing Service');
};
