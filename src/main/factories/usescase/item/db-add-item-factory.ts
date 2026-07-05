import { DbAddItem } from '../../../../data/usecases/item/db-add-item';
import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';
import { RedisCacheRepository } from '@/infra/db/redis/redis-cache-repository';

export const makeDbAddItem = (): DbAddItem => {
    const addItemRepository = new ItemPgRepository();
    const redisCacheRepository = new RedisCacheRepository();
    return new DbAddItem(addItemRepository, redisCacheRepository);
};
