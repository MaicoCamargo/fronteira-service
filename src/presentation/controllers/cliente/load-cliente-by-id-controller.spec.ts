import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { mockFakeClienteModel } from '../../../../tests/mock/mock-cliente';
import { LoadClienteByIdController } from './load-cliente-by-id-controller';
import { HttpRequest } from '../../protocols';

describe('LoadClienteByIdController', () => {
    test('Deve chamar LoadClienteById com valores corretos', () => {
        const { sut, loadClienteByIdStub } = makeSut();
        const loadByIdSpy = jest.spyOn(loadClienteByIdStub, 'loadById');
        sut.handle(makeFakeHttpRequest());
        expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id);
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
