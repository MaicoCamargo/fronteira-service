import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClientes, LoadClientesParams } from '../../../domain/usecases/cliente/load-clientes';
import { ok, serverError } from '../../helpers/http';

export class LoadClientesController implements Controller {
    constructor(private readonly loadClientes: LoadClientes) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const params: LoadClientesParams = {
                ...httpRequest.query
            };
            return ok(await this.loadClientes.load(params));
        } catch (error) {
            return serverError(error);
        }
    }
}
