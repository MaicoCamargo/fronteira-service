import { SaveSimpleBillingIntegrationModel } from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { mockFakeAddServicoParams, mockFakeDbServicoModel } from './mock-servico';
import { ENV } from '@/main/config/env';

export const makeSaveSimpleBillingIntegrationModel = (): SaveSimpleBillingIntegrationModel => ({
    // @TODO MONTAR OS CAMPOS COM OS OUTROS MOCKS
    user: 1,
    name: `Fronteira service ${mockFakeAddServicoParams().cliente.id}:${mockFakeAddServicoParams().carro.id}:${
        mockFakeAddServicoParams().valor
    }`,
    order: mockFakeDbServicoModel().id_servico,
    description: mockFakeAddServicoParams().billing.description,
    amount: mockFakeAddServicoParams().billing.amount,
    payments: [
        {
            installments: mockFakeAddServicoParams().billing.payments[0].installments,
            value: mockFakeAddServicoParams().billing.payments[0].installments,
            status: mockFakeAddServicoParams().billing.payments[0].status,
            type: mockFakeAddServicoParams().billing.payments[0].type
        }
    ],
    service: Number(ENV.SERVICE.ID)
});
