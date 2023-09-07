import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { badRequest, ok, serverError } from '../../helpers/http';
import { MissingParamError } from '../../errors';

export class LoadClienteByIdController implements Controller {
    constructor(private readonly loadClienteById: LoadClienteById) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            if (!httpRequest.params.id) return badRequest(new MissingParamError('id é obrigatório'));
            const cliente = await this.loadClienteById.loadById(httpRequest.params.id);
            return ok(cliente);
        } catch (err) {
            return serverError(err);
        }
    }
}
