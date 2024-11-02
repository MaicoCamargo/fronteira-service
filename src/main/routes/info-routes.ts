import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeLoadInfoController } from '@/main/factories/controller/load-info-controller-factory';

export default (router: Router): void => {
    router.get('/info', expressRouterAdapter(makeLoadInfoController()));
};
