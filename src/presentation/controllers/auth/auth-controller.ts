import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok, serverError, unauthorized } from '@/presentation/helpers/http';
import { LoadAuth } from '@/domain/usecases/auth/load-auth';
import { IntegrationError } from '@/presentation/errors/integration-error';
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error';

export class AuthController implements Controller {
    constructor(private readonly loadAuth: LoadAuth) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const credential = httpRequest.body;
            const detail = await this.loadAuth.auth(credential);
            return ok(detail);
        } catch (err) {
            if (err instanceof InvalidCredentialsError) {
                return unauthorized(err);
            }
            if (err instanceof IntegrationError) {
                return { statusCode: err.statusCode, body: { message: err.message } };
            }
            return serverError(err as Error);
        }
    }
}
