import { DbDeleteItem } from '../../../../data/usecases/item/db-delete-item';
import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';

export const makeDbDeleteItem = (): DbDeleteItem => {
    const itemPgRepository = new ItemPgRepository();
    return new DbDeleteItem(itemPgRepository);
};
