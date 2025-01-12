import { makeAddEnderecoController } from '../factories/controller/endereco/add-endereco-controller-factory';
import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { adminRole } from '@/main/middlewares/role-admin-middleware';

export default (router: Router): void => {
    router.post('/endereco', adminRole, expressRouterAdapter(makeAddEnderecoController()));
};
