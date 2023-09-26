import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { AddServico } from '../../../domain/usecases/servico/add-servico';
import { ok, serverError } from '../../helpers/http';

export class SaveServicoController implements Controller {
    constructor(private readonly addServico: AddServico) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const servico = await this.addServico.add(httpRequest.body);
            return ok(servico);
        } catch (err) {
            return serverError(err);
        }
    }
}
