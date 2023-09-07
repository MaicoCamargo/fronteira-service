import { DbDeleteCliente } from '../../../../data/usecases/cliente/db-delete-cliente';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';

export const makeDbDeleteCliente = (): DbDeleteCliente => {
    const clientePgRepository = new ClientePgRepository();
    return new DbDeleteCliente(clientePgRepository);
};
