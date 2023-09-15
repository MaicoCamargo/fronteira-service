import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { PageFilter } from '../../../main/protocols/page-filter';

export class LoadItensController implements Controller {
    constructor(private readonly loadItens: LoadItens) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const pageFilter: PageFilter = httpRequest.query;
        await this.loadItens.load(pageFilter);
        return await Promise.resolve(undefined);
    }
}
