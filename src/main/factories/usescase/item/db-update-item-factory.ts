import { DbUpdateItem } from '../../../../data/usecases/item/db-update-item';
import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';

export const makeDbUpdateItem = (): DbUpdateItem => {
    const itemPgRepository = new ItemPgRepository();
    return new DbUpdateItem(itemPgRepository);
};
