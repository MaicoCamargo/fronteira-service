import { Controller, HttpResponse } from '../../protocols';
import { UpdateCliente } from '../../../domain/usecases/cliente/update-cliente';
import { serverError } from '../../helpers/http';

export class UpdateClienteController implements Controller {
    constructor(private readonly updateCliente: UpdateCliente) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        try {
            await this.updateCliente.update(httpRequest.body);
            return await Promise.resolve(null);
        } catch (err) {
            return serverError(err);
        }
    }
}
