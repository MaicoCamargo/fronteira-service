import { IntegrationLoadAuth } from '@/data/usecases/auth/integration-load-auth';
import { CredencialParams } from '@/domain/usecases/auth/load-auth';
import { makeIntegrationLoadAuth } from '@/main/factories/usescase/auth/integration-load-auth-factory';
import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';
import { Wrapper } from '@/main/protocols/http-wrapper';

export const AuthHelper = {
    integrationLoadAuth: null as IntegrationLoadAuth,

    async init(): Promise<void> {
        AxiosHelper.getInstance(ENV.AUTH_SERVICE_HOST);
        this.integrationLoadAuth = makeIntegrationLoadAuth();
    },

    async authenticate(): Promise<string> {
        if (!this.integrationLoadAuth) {
            throw new Error('AuthHelper not initialized. Call init() first.');
        }
        // user com role ADMIN em auth-service
        const credential: CredencialParams = {
            username: 'test',
            password: 'test'
        };
        const wrapper: Wrapper<string> = await this.integrationLoadAuth.auth(credential);
        return `Bearer ${wrapper.content}`;
    },

    async destroy(): Promise<void> {
        await AxiosHelper.getInstance(ENV.AUTH_SERVICE_HOST).destroy();
        await AxiosHelper.getInstance(ENV.BILLING_SERVICE_HOST).destroy();
    }
};
