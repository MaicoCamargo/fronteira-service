import { Controller, HttpResponse } from '../../protocols';
import { UpdateCliente } from '../../../domain/usecases/cliente/update-cliente';

export class UpdateClienteController implements Controller {
    constructor(private readonly updateCliente: UpdateCliente) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        await this.updateCliente.update(httpRequest.body);
        return await Promise.resolve(null);
    }
}
