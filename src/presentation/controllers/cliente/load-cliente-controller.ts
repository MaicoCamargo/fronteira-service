import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { ok } from '../../helpers/http';

export class LoadClienteController implements Controller {
    constructor(private readonly loadClientes: LoadClientes) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return ok(await this.loadClientes.load());
    }
}
