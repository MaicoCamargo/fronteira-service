import { DbLoadClienteById } from '../../../../data/usecases/cliente/db-load-cliente-by-id';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';

export const makeDbLoadClienteById = (): DbLoadClienteById => {
    const clientePgRepository = new ClientePgRepository();
    return new DbLoadClienteById(clientePgRepository);
};
