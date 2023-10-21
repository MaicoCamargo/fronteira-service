import { DbDeleteCliente } from '../../../../data/usecases/cliente/db-delete-cliente';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';

export const makeDbDeleteCliente = (): DbDeleteCliente => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    return new DbDeleteCliente(clientePgRepository, carroPgRepository, carroPgRepository);
};
