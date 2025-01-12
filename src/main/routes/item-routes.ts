import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { Router } from 'express';
import { makeUpdateItemController } from '../factories/controller/item/update-item-controller-factory';
import { makeLoadItensController } from '../factories/controller/item/load-itens-controller-factory';
import { makeSaveItemController } from '../factories/controller/item/save-item-controller-factory';
import { makeDeleteItemController } from '../factories/controller/item/delete-item-controller-factory';
import { adminRole } from '@/main/middlewares/role-admin-middleware';

export default (router: Router): void => {
    router.get('/itens', adminRole, expressRouterAdapter(makeLoadItensController()));
    router.post('/itens', adminRole, expressRouterAdapter(makeSaveItemController()));
    router.put('/itens/:id', adminRole, expressRouterAdapter(makeUpdateItemController()));
    router.delete('/itens/:id', adminRole, expressRouterAdapter(makeDeleteItemController()));
};
