import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { DbLoadClientes } from '../../../../data/usecases/cliente/db-load-clientes';

export const makeDbLoadCliente = (): DbLoadClientes => {
    const clientePgRepository = new ClientePgRepository();
    return new DbLoadClientes(clientePgRepository);
};
