import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeHealthCheckController } from '@/main/factories/controller/health-check-controller-factory';

export default (router: Router): void => {
    router.get('/health-check', expressRouterAdapter(makeHealthCheckController()));
};
