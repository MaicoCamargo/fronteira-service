import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeLoadMyMechanicShopController } from '@/main/factories/controller/mechanic-shop/load-my-mechanic-shop-controller-factory';

export default (router: Router): void => {
    router.get('/mechanic-shop', expressRouterAdapter(makeLoadMyMechanicShopController()));
};
