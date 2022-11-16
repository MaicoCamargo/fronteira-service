import { LogControllerDecorator } from './log';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

const makeFakeRequest = (): HttpRequest => ({
    body: { name: 'any_name', email: 'any_email@email.com', password: '123' }
});

const makeController = () => {
    class ControllerStub implements Controller {
        handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = { body: { any: 'any' }, statusCode: 200 };
            return Promise.resolve(httpResponse);
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
        await sut.handle(makeFakeRequest());
        expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
    });
});
