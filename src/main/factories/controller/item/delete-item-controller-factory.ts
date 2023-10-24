import { Controller } from '../../../../presentation/protocols';
import { DeleteItemController } from '../../../../presentation/controllers/item/delete-item-controller';
import { makeDbDeleteItem } from '../../usescase/item/db-delete-item-factory';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';

export const makeDeleteItemController = (): Controller => {
    return makeLogControllerDecorator(new DeleteItemController(makeDbDeleteItem()));
};
