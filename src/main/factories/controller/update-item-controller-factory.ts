import { makeDbUpdateItem } from '../usescase/item/db-update-item-factory';
import { UpdateItemController } from '../../../presentation/controllers/item/update-item-controller';

export const makeUpdateItemController = (): UpdateItemController => {
    const dbUpdateItem = makeDbUpdateItem();
    return new UpdateItemController(dbUpdateItem);
};
