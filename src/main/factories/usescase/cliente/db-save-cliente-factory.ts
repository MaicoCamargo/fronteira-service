import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { DbAddCliente } from '../../../../data/usecases/cliente/db-add-cliente';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';
import { EnderecoPgRepository } from '../../../../infra/db/pg/endereco-pg-repository';

export const makeDbAddCliente = (): DbAddCliente => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    const enderecoPgRepository = new EnderecoPgRepository();
    return new DbAddCliente(clientePgRepository, carroPgRepository, enderecoPgRepository);
};
