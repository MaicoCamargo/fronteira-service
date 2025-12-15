import { DbDeleteCliente } from '@/data/usecases/cliente/db-delete-cliente';
import { ClientePgRepository } from '@/infra/db/pg/cliente-pg-repository';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbDeleteCliente = (): DbDeleteCliente => {
    const clientePgRepository = new ClientePgRepository();
    const carroPgRepository = new CarroPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbDeleteCliente(clientePgRepository, carroPgRepository, carroPgRepository, redisCacheRepository);
};
