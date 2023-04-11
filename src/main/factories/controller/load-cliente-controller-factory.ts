import { Controller } from '../../../presentation/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { LoadClienteController } from '../../../presentation/controllers/cliente/load-cliente-controller';
import { makeDbLoadCliente } from '../usescase/cliente/db-load-cliente-factory';

export const makeLoadClienteController = (): Controller => {
    const loadClienteController = new LoadClienteController(makeDbLoadCliente());
    return makeLogControllerDecorator(loadClienteController);
};
