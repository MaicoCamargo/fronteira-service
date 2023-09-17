import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { Router } from 'express';
import { makeUpdateItemController } from '../factories/controller/update-item-controller-factory';
import { makeLoadItensController } from '../factories/controller/load-itens-controller-factory';
import { makeSaveItemController } from '../factories/controller/save-item-controller-factory';

export default (router: Router): void => {
    router.get('/itens', expressRouterAdapter(makeLoadItensController()));
    router.post('/itens', expressRouterAdapter(makeSaveItemController()));
    router.put('/itens/:id', expressRouterAdapter(makeUpdateItemController()));
};
