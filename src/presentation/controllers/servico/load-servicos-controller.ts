import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadServicos } from '../../../domain/usecases/servico/load-servicos';
import { PageFilter } from '../../../main/protocols/page-filter';
import { ok } from '../../helpers/http';

export class LoadServicosController implements Controller {
    constructor(private readonly loadServicos: LoadServicos) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const pageFilter: PageFilter = { page: httpRequest.query?.page, size: httpRequest.query?.size };
        const servicos = await this.loadServicos.load(pageFilter);
        return ok(servicos);
    }
}
