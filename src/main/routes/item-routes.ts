import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { LoadItensController } from '../../presentation/controllers/item/load-itens-controller';
import { makeDbLoadItens } from '../factories/usescase/item/db-load-itens-factory';
import { Router } from 'express';
import { SaveItemController } from '../../presentation/controllers/item/save-item-controller';
import { makeDbSaveItem } from '../factories/usescase/item/db-save-item-factory';

export default (router: Router): void => {
    router.get('/itens', expressRouterAdapter(new LoadItensController(makeDbLoadItens())));
    router.post('/itens', expressRouterAdapter(new SaveItemController(makeDbSaveItem())));
};
