import { makeAuthDetailController } from '@/main/factories/controller/auth/auth-detail-controller-factory';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { Router } from 'express';
import { makeAuthController } from '@/main/factories/controller/auth/auth-controller-factory';

export default (router: Router): void => {
    router.get('/auth', expressRouterAdapter(makeAuthDetailController()));
    router.post('/auth', expressRouterAdapter(makeAuthController()));
};
