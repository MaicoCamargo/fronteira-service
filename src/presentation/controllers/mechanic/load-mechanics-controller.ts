import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { LoadMechanics } from '@/domain/usecases/mechanic/load-mechanics';
import { ok, serverError } from '@/presentation/helpers/http';
import { PageFilter } from '@/main/protocols/page-filter';

export class LoadMechanicsController implements Controller {
    constructor(private readonly loadMechanics: LoadMechanics) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const pageFilter: PageFilter = httpRequest.query;
            return ok(await this.loadMechanics.load(pageFilter));
        } catch (error) {
            return serverError(error);
        }
    }
}
