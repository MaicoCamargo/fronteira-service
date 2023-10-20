import { makeAddEnderecoController } from '../factories/controller/endereco/add-endereco-controller-factory';
import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-router-adapter';

export default (router: Router): void => {
    router.post('/endereco', expressRouterAdapter(makeAddEnderecoController()));
};
