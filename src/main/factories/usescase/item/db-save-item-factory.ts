import { DbAddItem } from '../../../../data/usecases/item/db-add-item';
import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';

export const makeDbSaveItem = (): DbAddItem => {
    const itemPgRepository = new ItemPgRepository();
    return new DbAddItem(itemPgRepository);
};
