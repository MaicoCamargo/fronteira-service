import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { created, serverError } from '@/presentation/helpers/http';
import { UpdateBillingPayment } from '@/domain/usecases/billing/update-billing-payment';

export class UpdateBillingPaymentController implements Controller {
    constructor(private readonly updateBillingPayment: UpdateBillingPayment) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const billing = await this.updateBillingPayment.update(httpRequest.body);
            return created(billing);
        } catch (err) {
            return serverError(err);
        }
    }
}
