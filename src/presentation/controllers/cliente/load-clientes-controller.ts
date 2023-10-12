import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { ok, serverError } from '../../helpers/http';
import { PageFilter } from '../../../main/protocols/page-filter';

export class LoadClientesController implements Controller {
    constructor(private readonly loadClientes: LoadClientes) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const pageFilter: PageFilter = { page: httpRequest.query?.page, size: httpRequest.query?.size };
            if (pageFilter.page && pageFilter.size) return ok(await this.loadClientes.load(pageFilter));
            return ok(await this.loadClientes.load());
        } catch (error) {
            return serverError(error);
        }
    }
}
