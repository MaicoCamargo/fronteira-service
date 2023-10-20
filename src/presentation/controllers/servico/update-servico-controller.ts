import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { UpdateServico, UpdateServicoParams } from '../../../domain/usecases/servico/update-servico';
import { badRequest, ok, serverError } from '../../helpers/http';
import { InvalidParamError, MissingParamError } from '../../errors';

export class UpdateServicoController implements Controller {
    constructor(private readonly updateServico: UpdateServico) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params;
            const body: UpdateServicoParams = httpRequest.body;
            if (!id) return badRequest(new MissingParamError('query param id'));
            if (parseInt(id) !== body.id) return badRequest(new InvalidParamError('id'));
            const servico = await this.updateServico.update(body);
            return ok(servico);
        } catch (err) {
            return serverError(err);
        }
    }
}
