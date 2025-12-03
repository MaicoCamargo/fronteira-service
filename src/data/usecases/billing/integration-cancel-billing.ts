import { CancelBilling } from '@/domain/usecases/billing/cancel-billing';
import { CancelBillingIntegration } from '@/data/protocols/client/billing-service/cancel-billing-integration';

export class IntegrationCancelBilling implements CancelBilling {
    constructor(private readonly cancelBillingIntegration: CancelBillingIntegration) {}

    async cancel(params: any): Promise<void> {
        await this.cancelBillingIntegration.cancel(params);
    }
}
