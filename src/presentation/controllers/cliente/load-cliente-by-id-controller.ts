import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { ok } from '../../helpers/http';

export class LoadClienteByIdController implements Controller {
    constructor(private readonly loadClienteById: LoadClienteById) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const cliente = await this.loadClienteById.loadById(httpRequest.params.id);
        return ok(cliente);
    }
}
