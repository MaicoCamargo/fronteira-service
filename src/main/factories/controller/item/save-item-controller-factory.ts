import { makeDbAddItem } from '../../usescase/item/db-add-item-factory';
import { SaveItemController } from '../../../../presentation/controllers/item/save-item-controller';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { Controller } from '../../../../presentation/protocols';

export const makeSaveItemController = (): Controller => {
    return makeLogControllerDecorator(new SaveItemController(makeDbAddItem()));
};
