import { Controller } from '../../../../presentation/protocols';
import { DeleteClienteController } from '../../../../presentation/controllers/cliente/delete-cliente-controller';
import { makeDbDeleteCliente } from '../../usescase/cliente/db-delete-cliente-factory';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';

export const makeDeleteClienteController = (): Controller => {
    return makeLogControllerDecorator(new DeleteClienteController(makeDbDeleteCliente()));
};
