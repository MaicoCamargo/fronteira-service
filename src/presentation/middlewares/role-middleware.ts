import { Middleware } from '@/presentation/protocols/middleware';
import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { LoadAuthDetail } from '@/domain/usecases/auth/load-auth-detail';
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http';
import { IntegrationError } from '@/presentation/errors/integration-error';

export class RoleMiddleware implements Middleware {
    constructor(private readonly loadAuthDetail: LoadAuthDetail, private readonly role?: string) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const authorization = httpRequest.headers?.authorization;
            if (!authorization) {
                return unauthorized('unauthorized');
            }
            const wrapper = await this.loadAuthDetail.load(authorization);
            const user = wrapper.content;
            const found = user.roles?.find((value) => value === this.role);
            if (!found) {
                return forbidden('forbidden');
            }
            return ok(authorization);
        } catch (error) {
            if (error instanceof IntegrationError) {
                return { statusCode: error.statusCode, body: { error: error.message } };
            }
            return serverError(error);
        }
    }
}
