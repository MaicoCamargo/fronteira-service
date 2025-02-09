import { Router } from 'express';
import { adminRole } from '@/main/middlewares/role-admin-middleware';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeLoadMechanicsController } from '@/main/factories/controller/mechanic/load-mechanics-controller-factory';

export default (router: Router): void => {
    router.get('/mechanics', adminRole, expressRouterAdapter(makeLoadMechanicsController()));
};
