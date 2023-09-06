import { DeleteCliente } from '../../../domain/usecases/cliente/delete-cliente';
import { HttpRequest } from '../../protocols';
import { DeleteClienteController } from './delete-cliente-controller';
import { throwError } from '../../../domain/helper/test-helper';
import { noContent, serverError } from '../../helpers/http';

describe('DeleteClienteController', () => {
    test('deve chamar DeleteCliente com valores corretos', () => {
        const { sut, deleteClienteStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteClienteStub, 'delete');
        sut.handle(makeFakeHttpRequest());
        expect(deleteSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id);
    });

    test('Deve retornar 500 se LoadClienteById throws', async () => {
        const { sut, deleteClienteStub } = makeSut();
        jest.spyOn(deleteClienteStub, 'delete').mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Deve retornar 204 em caso de sucesso', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeHttpRequest());
        expect(httpResponse).toEqual(noContent());
    });
});

interface SutTypes {
    sut: DeleteClienteController;
    deleteClienteStub: DeleteCliente;
}

const makeSut = (): SutTypes => {
    const deleteClienteStub = makeDeleteCliente();
    const sut = new DeleteClienteController(deleteClienteStub);
    return {
        sut,
        deleteClienteStub
    };
};

const makeDeleteCliente = (): DeleteCliente => {
    class DeleteClienteStub implements DeleteCliente {
        delete(id: number): Promise<void> {
            return;
        }
    }
    return new DeleteClienteStub();
};

const makeFakeHttpRequest = (): HttpRequest => ({ params: { id: 1 } });
