import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBilling, SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export class IntegrationSaveSimpleBilling implements SaveSimpleBilling {
    constructor(private readonly saveBillingIntegration: SaveSimpleBillingIntegration) {}

    async save(params: SaveSimpleBillingParams): Promise<IntegrationLoadSimpleBillingModel> {
        // @todo remover hardcoded
        let order = 1;
        const billing: SaveSimpleBillingIntegrationModel = {
            ...params,
            order: order++,
            user: 1
        };
        return await this.saveBillingIntegration.save(billing);
    }
}
