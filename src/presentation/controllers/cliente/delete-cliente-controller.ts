import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { DeleteCliente } from '../../../domain/usecases/cliente/delete-cliente';

export class DeleteClienteController implements Controller {
    constructor(private readonly deleteCliente: DeleteCliente) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.deleteCliente.delete(httpRequest.params.id);
    }
}
