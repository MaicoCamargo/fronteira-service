import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols';
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository';

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller;
    private readonly logErrorRepository: LogErrorRepository;

    constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        console.group('httpRequest');
        console.log(httpRequest);
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode >= 300) {
            console.log('erro interno ->', httpResponse);
            await this.logErrorRepository.logError(httpResponse.body.stack);
        }
        console.log(httpResponse);
        console.groupEnd();
        return httpResponse;
    }
}
