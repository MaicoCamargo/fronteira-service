import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { Router } from 'express';
import { makeUpdateItemController } from '../factories/controller/item/update-item-controller-factory';
import { makeLoadItensController } from '../factories/controller/item/load-itens-controller-factory';
import { makeSaveItemController } from '../factories/controller/item/save-item-controller-factory';

export default (router: Router): void => {
    router.get('/itens', expressRouterAdapter(makeLoadItensController()));
    router.post('/itens', expressRouterAdapter(makeSaveItemController()));
    router.put('/itens/:id', expressRouterAdapter(makeUpdateItemController()));
};
