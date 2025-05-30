import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http';
import { LoadBillings } from '@/domain/usecases/billing/load-billings';

export class LoadBillingsController implements Controller {
    constructor(private readonly loadBillings: LoadBillings) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const billings = await this.loadBillings.load(httpRequest.query);
            return ok(billings);
        } catch (err) {
            return serverError(err);
        }
    }
}
