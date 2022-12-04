import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddEndereco } from '../../../domain/usecases/cliente/add-endereco';
import { serverError } from '../../helpers/http';

export class AddEnderecoController implements Controller {
    constructor(private readonly addEndereco: AddEndereco) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            await this.addEndereco.add(httpRequest.body);
            return await Promise.resolve(undefined);
        } catch (error) {
            return serverError(error);
        }
    }
}
