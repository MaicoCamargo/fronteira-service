import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { UpdateClienteController } from '../../../../presentation/controllers/cliente/update-cliente-controller';
import { makeDbUpdateCliente } from '../../usescase/cliente/db-update-cliente-factory';
import { Controller } from '../../../../presentation/protocols';

export const makeUpdateClienteController = (): Controller => {
    return makeLogControllerDecorator(new UpdateClienteController(makeDbUpdateCliente()));
};
