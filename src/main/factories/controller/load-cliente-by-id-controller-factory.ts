import { Controller } from '../../../presentation/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { LoadClienteByIdController } from '../../../presentation/controllers/cliente/load-cliente-by-id-controller';
import { makeDbLoadClienteById } from '../usescase/cliente/db-load-cliente-by-id-factory';

export const makeLoadClienteByIdController = (): Controller => {
    return makeLogControllerDecorator(new LoadClienteByIdController(makeDbLoadClienteById()));
};
