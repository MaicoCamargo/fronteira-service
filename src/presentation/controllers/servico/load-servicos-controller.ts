import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadServicos, LoadServicosParams } from '@/domain/usecases/servico/load-servicos';
import { ok } from '../../helpers/http';

export class LoadServicosController implements Controller {
    constructor(private readonly loadServicos: LoadServicos) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const params: LoadServicosParams = {
            ...httpRequest.query
        };
        const servicos = await this.loadServicos.load(params);
        return ok(servicos);
    }
}
