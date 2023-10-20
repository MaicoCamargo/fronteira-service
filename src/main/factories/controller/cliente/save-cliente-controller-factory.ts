import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAddCliente } from '../../usescase/cliente/db-save-cliente-factory';
import { SaveClienteController } from '../../../../presentation/controllers/cliente/save-cliente-controller';

export const makeSaveClienteController = (): Controller => {
    return makeLogControllerDecorator(new SaveClienteController(makeDbAddCliente()));
};
