import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { ok } from '../../helpers/http';
import { LoadOrderById } from '@/domain/usecases/servico/load-order-by-id';

export class LoadOrderByIdController implements Controller {
    constructor(private readonly loadOrderById: LoadOrderById) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params?.id;
        const order = await this.loadOrderById.loadById(id);
        return ok(order);
    }
}
