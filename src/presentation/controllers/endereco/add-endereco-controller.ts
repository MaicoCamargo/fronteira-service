import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddEndereco } from '../../../domain/usecases/endereco/add-endereco';
import { created, serverError } from '../../helpers/http';

export class AddEnderecoController implements Controller {
    constructor(private readonly addEndereco: AddEndereco) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            return created(await this.addEndereco.add(httpRequest.body));
        } catch (error) {
            return serverError(error);
        }
    }
}
