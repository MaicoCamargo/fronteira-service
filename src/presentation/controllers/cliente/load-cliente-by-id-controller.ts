import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { ok, serverError } from '../../helpers/http';

export class LoadClienteByIdController implements Controller {
    constructor(private readonly loadClienteById: LoadClienteById) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const cliente = await this.loadClienteById.loadById(httpRequest.params.id);
            return ok(cliente);
        } catch (err) {
            return serverError(err);
        }
    }
}
