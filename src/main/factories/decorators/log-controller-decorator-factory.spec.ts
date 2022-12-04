import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols';
import { ok, serverError } from '../../../presentation/helpers/http';
import { LogControllerDecorator } from '../../decorators/log';
import { LogErrorRepository } from '../../../data/protocols/db/log/log-error-repository';
import { EnderecoModel } from '../../../domain/models/endereco-model';

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            return ok(makeFakeEndereco());
        }
    }
    return new ControllerStub();
};

interface SutTypes {
    sut: LogControllerDecorator;
    controllerStub: Controller;
    logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController();
    const logErrorRepositoryStub = makeLogErrorRepositoryStub();
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return { sut, controllerStub, logErrorRepositoryStub };
};

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async logError(stack: string): Promise<void> {
            return await Promise.resolve();
        }
    }
    return new LogErrorRepositoryStub();
};

const makeFakeHttpRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_mail@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
});

const makeFakeEndereco = (): EnderecoModel => ({
    cep: 'any_cep',
    cidade: 'any_cidade',
    id_endereco: 1,
    numero: 'any_numero',
    complemento: 'any_complemento',
    rua: 'any_rua'
});

describe('LogController Decorator', () => {
    test('Deve chamar o controller handle', async () => {
        const { sut, controllerStub } = makeSut();
        const handleSpy = jest.spyOn(controllerStub, 'handle');
        await sut.handle(makeFakeHttpRequest());
        expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest());
        /* aqui eu estou garantindo que o meu decarator está chamando o controller com valores corretos */
    });
    test('Deve retornar o mesmo response do controller', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(ok(makeFakeEndereco()));
    });

    test('deve chamar o LogErrorRepository com valor correto se o controller retornar um erro de server', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
        const fakeError = new Error();
        fakeError.stack = 'any_stack';
        const error = serverError(fakeError);
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error));
        await sut.handle(makeFakeHttpRequest());
        expect(logSpy).toHaveBeenCalledWith('any_stack');
    });
});
