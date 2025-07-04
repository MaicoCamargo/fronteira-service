import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';

export const makeAuthServiceClient = (): AxiosHelper => {
    return AxiosHelper.getInstance(ENV.AUTH_SERVICE_HOST, 'Auth Service');
};
