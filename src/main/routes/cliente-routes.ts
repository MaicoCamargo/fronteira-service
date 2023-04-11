import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadClienteController } from '../factories/controller/load-cliente-controller-factory';

export default (router: Router): void => {
    router.get('/cliente', expressRouterAdapter(makeLoadClienteController()));
};
