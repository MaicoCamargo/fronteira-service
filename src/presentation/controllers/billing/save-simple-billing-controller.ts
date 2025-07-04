import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { created, serverError } from '@/presentation/helpers/http';
import { SaveSimpleBilling } from '@/domain/usecases/billing/save-simple-billing';

export class SaveSimpleBillingController implements Controller {
    constructor(private readonly saveSimpleBilling: SaveSimpleBilling) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const billing = await this.saveSimpleBilling.save(httpRequest.body);
            return created(billing);
        } catch (err) {
            return serverError(err);
        }
    }
}
