import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers/http';
import { LoadAuth } from '@/domain/usecases/auth/load-auth';

export class AuthController implements Controller {
    constructor(private readonly loadAuth: LoadAuth) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const credential = httpRequest.body;
            const detail = await this.loadAuth.auth(credential);
            return ok(detail);
        } catch (err) {
            console.error('An error occurred', err);
            return serverError(err);
        }
    }
}
