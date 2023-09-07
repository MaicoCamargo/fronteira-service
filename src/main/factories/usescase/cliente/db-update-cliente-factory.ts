import { DbUpdateCliente } from '../../../../data/usecases/cliente/db-update-cliente';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';

export const makeDbUpdateCliente = (): DbUpdateCliente => {
    const clientePgRepository = new ClientePgRepository();
    return new DbUpdateCliente(clientePgRepository);
};
