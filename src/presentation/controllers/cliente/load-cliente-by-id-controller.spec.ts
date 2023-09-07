import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { mockFakeClienteModel } from '../../../../tests/mock/mock-cliente';
import { LoadClienteByIdController } from './load-cliente-by-id-controller';
import { HttpRequest } from '../../protocols';
import { badRequest, ok, serverError } from '../../helpers/http';
import { throwError } from '../../../../tests/helper/test-helper';
import { MissingParamError } from '../../errors';

describe('LoadClienteByIdController', () => {
    test('Deve chamar LoadClienteById com valores corretos', () => {
        const { sut, loadClienteByIdStub } = makeSut();
        const loadByIdSpy = jest.spyOn(loadClienteByIdStub, 'loadById');
        sut.handle(makeFakeHttpRequest());
        expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id);
    });

    test('Deve retornar 200 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(ok(mockFakeClienteModel()));
    });

    test('Deve retornar 500 se LoadClienteById throws', async () => {
        const { sut, loadClienteByIdStub } = makeSut();
        jest.spyOn(loadClienteByIdStub, 'loadById').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Deve retornar 400 se o id não for fonecido', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({ params: {} });
        expect(httpResponse).toEqual(badRequest(new MissingParamError('id é obrigatório')));
    });
});

interface SutTypes {
    sut: LoadClienteByIdController;
    loadClienteByIdStub: LoadClienteById;
}

const makeSut = (): SutTypes => {
    const loadClienteByIdStub = makeLoadClienteById();
    const sut = new LoadClienteByIdController(loadClienteByIdStub);
    return {
        sut,
        loadClienteByIdStub
    };
};

const makeLoadClienteById = () => {
    class LoadClienteByIdStub implements LoadClienteById {
        async loadById(id: number): Promise<ClienteModel> {
            return mockFakeClienteModel();
        }
    }
    return new LoadClienteByIdStub();
};

const makeFakeHttpRequest = (): HttpRequest => ({ params: { id: 1 } });
