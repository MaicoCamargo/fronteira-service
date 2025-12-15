import { ItemPgRepository } from '@/infra/db/pg/item-pg-repository';
import { DbLoadItens } from '@/data/usecases/item/db-load-itens';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbLoadItens = (): DbLoadItens => {
    const itemPgRepository = new ItemPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbLoadItens(itemPgRepository, redisCacheRepository, redisCacheRepository);
};
