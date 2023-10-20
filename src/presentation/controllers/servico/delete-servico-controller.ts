import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { badRequest, noContent } from '../../helpers/http';
import { MissingParamError } from '../../errors';
import { DeleteServico } from '../../../domain/usecases/servico/delete-servico';

export class DeleteServicoController implements Controller {
    constructor(private readonly deleteServico: DeleteServico) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params?.id;
        if (!id) badRequest(new MissingParamError('id'));
        await this.deleteServico.delete(id);
        return noContent();
    }
}
