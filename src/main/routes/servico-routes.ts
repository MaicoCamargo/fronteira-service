import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadServicosController } from '../factories/controller/load-servicos-controller-factory';
import { Router } from 'express';

export default (router: Router): void => {
    router.get('/servicos', expressRouterAdapter(makeLoadServicosController()));
};
