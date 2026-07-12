import { DbTransferirCarros } from '@/data/usecases/carro/db-transferir-carros';
import { CarroPgRepository } from '@/infra/db/pg/carro-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbTransferirCarrosFactory = (): DbTransferirCarros => {
    const carroPgRepository = new CarroPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbTransferirCarros(carroPgRepository, redisCacheRepository);
};
