import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { DbLoadClientes } from '../../../../data/usecases/cliente/db-load-clientes';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';
import { EnderecoPgRepository } from '../../../../infra/db/pg/endereco-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbLoadCliente = (): DbLoadClientes => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    const enderecoPgRepository = new EnderecoPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbLoadClientes(
        clientePgRepository,
        carroPgRepository,
        enderecoPgRepository,
        redisCacheRepository,
        redisCacheRepository
    );
};
