import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { TryOut, TryOutParams } from '@/domain/usecases/try-out';
import { badRequest, ok, serverError } from '@/presentation/helpers/http';
import { MissingParamError } from '@/presentation/errors';

export class TryOutController implements Controller {
    constructor(private readonly tryOut: TryOut) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, contact }: TryOutParams = httpRequest.body;
            if (!name || !contact) return badRequest(new MissingParamError('name or contact'));
            const servico = await this.tryOut.try({ name, contact });
            return ok(servico);
        } catch (err) {
            return serverError(err);
        }
    }
}
