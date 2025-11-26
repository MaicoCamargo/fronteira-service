import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeTryOutController } from '@/main/factories/controller/try-out-controller-factory';

export default (router: Router): void => {
    router.post('/try-out', expressRouterAdapter(makeTryOutController()));
};
