import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { PageFilter } from '../../../main/protocols/page-filter';
import { ok } from '../../helpers/http';

export class LoadItensController implements Controller {
    constructor(private readonly loadItens: LoadItens) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const pageFilter: PageFilter = httpRequest.query;
        const models = await this.loadItens.load(pageFilter);
        return ok(models);
    }
}
