import { DbUpdateCliente } from '../../../../data/usecases/cliente/db-update-cliente';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';

export const makeDbUpdateCliente = (): DbUpdateCliente => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    return new DbUpdateCliente(
        clientePgRepository,
        carroPgRepository,
        carroPgRepository,
        carroPgRepository,
        carroPgRepository
    );
};
