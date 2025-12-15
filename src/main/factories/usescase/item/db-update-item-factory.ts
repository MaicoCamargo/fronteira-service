import { DbUpdateItem } from '@/data/usecases/item/db-update-item';
import { ItemPgRepository } from '@/infra/db/pg/item-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbUpdateItem = (): DbUpdateItem => {
    const itemPgRepository = new ItemPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbUpdateItem(itemPgRepository, redisCacheRepository);
};
