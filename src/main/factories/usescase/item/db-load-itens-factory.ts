import { ItemPgRepository } from '../../../../infra/db/pg/item-pg-repository';
import { DbLoadItens } from '../../../../data/usecases/item/db-load-itens';

export const makeDbLoadItens = (): DbLoadItens => {
    const itemPgRepository = new ItemPgRepository();
    return new DbLoadItens(itemPgRepository);
};
