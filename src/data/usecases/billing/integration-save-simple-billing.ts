import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBilling, SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';

export class IntegrationSaveSimpleBilling implements SaveSimpleBilling {
    constructor(private readonly saveBillingIntegration: SaveSimpleBillingIntegration) {}

    async save(params: SaveSimpleBillingParams): Promise<string> {
        // @todo remover hardcoded
        let order = 1;
        const billing: SaveSimpleBillingModel = {
            ...params,
            order: order++,
            user: 1
        };
        return await this.saveBillingIntegration.save(billing);
    }
}
