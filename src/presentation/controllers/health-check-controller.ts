import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { ok } from '@/presentation/helpers/http';

export class HealthCheckController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return ok({ status: 'UP' });
    }
}
