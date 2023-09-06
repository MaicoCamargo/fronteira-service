import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';

export class LoadClienteByIdController implements Controller {
    constructor(private readonly loadClienteById: LoadClienteById) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.loadClienteById.loadById(httpRequest.params.id);
        return await Promise.resolve(undefined);
    }
}
