import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddCliente } from '../../../domain/usecases/cliente/add-cliente';
import { created } from '../../helpers/http';

export class SaveClienteController implements Controller {
    constructor(private readonly addCliente: AddCliente) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const cliente = await this.addCliente.add(httpRequest.body);
        return created(cliente);
    }
}
