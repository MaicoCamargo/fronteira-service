import { DeleteCliente } from '../../../domain/usecases/cliente/delete-cliente';
import { HttpRequest } from '../../protocols';
import { DeleteClienteController } from './delete-cliente-controller';

describe('DeleteClienteController', () => {
    test('deve chamar DeleteCliente com valores corretos', () => {
        const { sut, deleteClienteStub } = makeSut();
        const deleteSpy = jest.spyOn(deleteClienteStub, 'delete');
        sut.handle(makeFakeHttpRequest());
        expect(deleteSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id);
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
