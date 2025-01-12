import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http';
import { LoadAuthDetail } from '@/domain/usecases/auth/load-auth-detail';

export class AuthDetailController implements Controller {
    constructor(private readonly loadAuthDetail: LoadAuthDetail) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const jwt = httpRequest.headers.authorization;
            const detail = await this.loadAuthDetail.load(jwt);
            return ok(detail);
        } catch (err) {
            return serverError(err);
        }
    }
}
