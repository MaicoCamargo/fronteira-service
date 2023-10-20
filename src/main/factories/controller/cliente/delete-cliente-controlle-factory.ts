import { Controller } from '../../../../presentation/protocols';
import { DeleteClienteController } from '../../../../presentation/controllers/cliente/delete-cliente-controller';
import { makeDbDeleteCliente } from '../../usescase/cliente/db-delete-cliente-factory';

export const makeDeleteClienteController = (): Controller => {
    return new DeleteClienteController(makeDbDeleteCliente());
};
