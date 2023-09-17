import { Controller } from '../../../presentation/protocols';
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory';
import { LoadItensController } from '../../../presentation/controllers/item/load-itens-controller';
import { makeDbLoadItens } from '../usescase/item/db-load-itens-factory';

export const makeLoadItensController = (): Controller => {
    return makeLogControllerDecorator(new LoadItensController(makeDbLoadItens()));
};
