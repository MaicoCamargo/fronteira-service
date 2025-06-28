import { SaveSimpleBillingIntegrationModel } from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { ENV } from '@/main/config/env';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { UpdateSimpleBilling } from '@/domain/usecases/billing/update-simple-billing';
import { UpdateSimpleBillingIntegration } from '@/data/protocols/client/billing-service/update-simple-billing-integration';

export class IntegrationUpdateSimpleBilling implements UpdateSimpleBilling {
    constructor(private readonly updateSimpleBillingIntegration: UpdateSimpleBillingIntegration) {}

    async update(id: number, params: SaveSimpleBillingParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        const billing: SaveSimpleBillingIntegrationModel = {
            service: Number(ENV.SERVICE.ID),
            user: 1,
            name: params.name ? params.name : `Fronteira service->order${params.order}`,
            description: params.description,
            amount: params.amount,
            order: params.order,
            payments: params.payments
        };
        return await this.updateSimpleBillingIntegration.update(id, billing);
    }
}
