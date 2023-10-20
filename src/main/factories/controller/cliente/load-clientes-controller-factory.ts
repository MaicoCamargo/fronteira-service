import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { LoadClientesController } from '../../../../presentation/controllers/cliente/load-clientes-controller';
import { makeDbLoadCliente } from '../../usescase/cliente/db-load-cliente-factory';

export const makeLoadClientesController = (): Controller => {
    const loadClientesController = new LoadClientesController(makeDbLoadCliente());
    return makeLogControllerDecorator(loadClientesController);
};
