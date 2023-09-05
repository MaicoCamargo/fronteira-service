import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddCliente } from '../../../domain/usecases/cliente/add-cliente';

export class SaveClienteController implements Controller {
    constructor(private readonly addCliente: AddCliente) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        await this.addCliente.add(httpRequest.body);
        return await Promise.resolve(undefined);
    }
}
