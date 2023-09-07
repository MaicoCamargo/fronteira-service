import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { DbAddCliente } from '../../../../data/usecases/cliente/db-add-cliente';

export const makeDbAddCliente = (): DbAddCliente => {
    const clientePgRepository = new ClientePgRepository();
    return new DbAddCliente(clientePgRepository);
};
