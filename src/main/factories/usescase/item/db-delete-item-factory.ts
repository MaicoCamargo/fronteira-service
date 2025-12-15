import { DbDeleteItem } from '@/data/usecases/item/db-delete-item';
import { ItemPgRepository } from '@/infra/db/pg/item-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbDeleteItem = (): DbDeleteItem => {
    const itemPgRepository = new ItemPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbDeleteItem(itemPgRepository, redisCacheRepository);
};
