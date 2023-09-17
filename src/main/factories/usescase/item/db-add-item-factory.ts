import { DbAddItem } from '../../../../data/usecases/item/db-add-item';
import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';

export const makeDbAddItem = (): DbAddItem => {
    const addItemRepository = new ItemPgRepository();
    return new DbAddItem(addItemRepository);
};
