import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { LoadInfo } from '@/domain/usecases/load-info';
import { ok, serverError } from '@/presentation/helpers/http';

export class LoadInfoController implements Controller {
    constructor(private readonly healthCheck: LoadInfo) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            return ok(await this.healthCheck.load());
        } catch (error) {
            return serverError(error);
        }
    }
}
