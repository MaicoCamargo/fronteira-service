import { UpdateBillingPayment, UpdateBillingPaymentParams } from '@/domain/usecases/billing/update-billing-payment';
import { UpdateBillingPaymentIntegration } from '@/data/protocols/client/billing-service/update-billing-payment-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export class IntegrationUpdateBillingPayment implements UpdateBillingPayment {
    constructor(private readonly updateBillingPaymentIntegration: UpdateBillingPaymentIntegration) {}

    async update(payment: UpdateBillingPaymentParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        return await this.updateBillingPaymentIntegration.updatePayment({
            id: payment.id,
            value: payment.value,
            type: payment.type.valueOf(),
            status: payment.status.valueOf()
        });
    }
}
