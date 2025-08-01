import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { mockFakeServicoModel } from './mock-servico';
import { makeSaveSimpleBillingIntegrationModel } from './mock-save-simple-billing-model-integration';

export const makeIntegrationLoadSimpleBillingModel = (): IntegrationLoadSimpleBillingModel => ({
    id: 44,
    name: `Fronteira service:${mockFakeServicoModel().cliente.id}:${mockFakeServicoModel().carro.id}:${
        mockFakeServicoModel().valor
    }`,
    description: makeSaveSimpleBillingIntegrationModel().description,
    amount: makeSaveSimpleBillingIntegrationModel().amount,
    order: mockFakeServicoModel().id,
    createdAt: new Date('2025-05-17T19:32:57.441Z'),
    user: makeSaveSimpleBillingIntegrationModel().user,
    payments: [
        {
            id: 59,
            value: makeSaveSimpleBillingIntegrationModel().payments[0].value,
            installment: makeSaveSimpleBillingIntegrationModel().payments[0].installments,
            type: {
                name: 'CASH_ON_DELIVERY',
                id: makeSaveSimpleBillingIntegrationModel().payments[0].type.valueOf()
            },
            expirationDate: new Date('2025-06-02T23:59:59.441346212'),
            status: {
                name: 'PAID/COMPLETED',
                id: makeSaveSimpleBillingIntegrationModel().payments[0].status.valueOf(),
                date: new Date('2025-05-17T16:32:57.441384326')
            }
        }
    ],
    status: 'COMPLETED',
    code: 'BXXXXX'
});
