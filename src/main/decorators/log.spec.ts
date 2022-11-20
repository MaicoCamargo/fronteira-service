import { LogControllerDecorator } from './log';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { serverError } from '../../presentation/helpers/http';
import { LogErrorRepository } from '../../data/protocols/log-error-repository';

const makeFakeHttpRequest = (): HttpRequest => ({
    body: { name: 'any_name', email: 'any_email@email.com', password: '123' }
});

const makeFakeHttpResponse = (): HttpResponse => ({
    body: { name: 'any_name', email: 'any_email@email.com', password: '123' },
    statusCode: 200
});

const makeController = () => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            return makeFakeHttpResponse();
        }
    }

    return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async log(stack: string): Promise<void> {}
    }

    return new LogErrorRepositoryStub();
};

interface SutTypes {
    sut: LogControllerDecorator;
    controllerStub: Controller;
    logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController();
    const logErrorRepositoryStub = makeLogErrorRepository();
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return { sut, controllerStub, logErrorRepositoryStub };
};

const makeFakeError = () => {
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    return serverError(fakeError);
};

describe('Log Decorator', function () {
    test('Deve chamar o controller.handle()', async () => {
        const { sut, controllerStub } = makeSut();
        const handleSpy = jest.spyOn(controllerStub, 'handle');
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest());
        expect(httpResponse).toEqual(makeFakeHttpResponse());
    });

    test('Deve chamar o LogErrorRepository com o erro correto se controller retornar um server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(makeFakeError()));
        await sut.handle(makeFakeHttpRequest());
        expect(logSpy).toHaveBeenCalledWith(makeFakeError().body.stack);
    });
});
