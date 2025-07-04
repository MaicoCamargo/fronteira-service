import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBilling, SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { ENV } from '@/main/config/env';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class IntegrationSaveSimpleBilling implements SaveSimpleBilling {
    constructor(private readonly saveBillingIntegration: SaveSimpleBillingIntegration) {}

    async save(params: SaveSimpleBillingParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        // @todo montar 'name' no padrão: Fronteira service:${params.cliente.id}:${servico.carro.id}:${servico.valor}
        const billing: SaveSimpleBillingIntegrationModel = {
            service: Number(ENV.SERVICE.ID),
            user: 1,
            name: params.name ? params.name : `Fronteira service->order${params.order}`,
            description: params.description,
            amount: params.amount,
            order: params.order,
            payments: params.payments
        };
        return await this.saveBillingIntegration.save(billing);
    }
}
