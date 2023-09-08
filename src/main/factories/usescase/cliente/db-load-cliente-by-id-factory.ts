import { DbLoadClienteById } from '../../../../data/usecases/cliente/db-load-cliente-by-id';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';

export const makeDbLoadClienteById = (): DbLoadClienteById => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    return new DbLoadClienteById(clientePgRepository, carroPgRepository);
};
