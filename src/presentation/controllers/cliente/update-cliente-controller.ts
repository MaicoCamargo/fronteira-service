import { Controller, HttpResponse } from '../../protocols';
import { UpdateCliente } from '../../../domain/usecases/cliente/update-cliente';
import { ok, serverError } from '../../helpers/http';

export class UpdateClienteController implements Controller {
    constructor(private readonly updateCliente: UpdateCliente) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        try {
            const cliente = await this.updateCliente.update(httpRequest.body);
            return ok(cliente);
        } catch (err) {
            return serverError(err);
        }
    }
}
