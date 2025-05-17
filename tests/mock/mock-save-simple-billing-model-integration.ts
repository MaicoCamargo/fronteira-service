import { SaveSimpleBillingIntegrationModel } from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { mockFakeAddServicoParams, mockFakeServicoModel } from './mock-servico';

export const makeSaveSimpleBillingIntegrationModel = (): SaveSimpleBillingIntegrationModel => ({
    // @TODO MONTAR OS CAMPOS COM OS OUTROS MOCKS
    user: 1,
    name: `Fronteira service ${mockFakeAddServicoParams().cliente.id}:${mockFakeAddServicoParams().carro.id}:${
        mockFakeAddServicoParams().valor
    }`,
    order: mockFakeServicoModel().id,
    description: 'any_description',
    amount: mockFakeAddServicoParams().valor,
    payments: [
        {
            installments: mockFakeAddServicoParams().billing.payments[0].installments,
            value: mockFakeAddServicoParams().billing.payments[0].installments,
            status: mockFakeAddServicoParams().billing.payments[0].status,
            type: mockFakeAddServicoParams().billing.payments[0].type
        }
    ]
});
