import { LogControllerDecorator } from './log';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

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

interface SutTypes {
    sut: LogControllerDecorator;
    controllerStub: Controller;
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController();
    const sut = new LogControllerDecorator(controllerStub);
    return { sut, controllerStub };
};
describe('Log Decorator', function () {
    test('Deve chamar o controller.handle()', async () => {
        const { sut, controllerStub } = makeSut();
        const handleSpy = jest.spyOn(controllerStub, 'handle');
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest());
        expect(httpResponse).toEqual(makeFakeHttpResponse());
    });
});
