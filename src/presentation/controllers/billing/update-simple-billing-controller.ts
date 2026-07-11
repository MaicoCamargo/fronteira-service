import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { created, serverError } from '@/presentation/helpers/http';
import { UpdateSimpleBilling } from '@/domain/usecases/billing/update-simple-billing';

export class UpdateSimpleBillingController implements Controller {
    constructor(private readonly updateSimpleBilling: UpdateSimpleBilling) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const code = httpRequest.params.code;
            const billing = await this.updateSimpleBilling.update(code, httpRequest.body);
            return created(billing);
        } catch (err) {
            return serverError(err);
        }
    }
}
