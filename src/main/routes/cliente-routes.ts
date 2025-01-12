import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadClientesController } from '../factories/controller/cliente/load-clientes-controller-factory';
import { makeLoadClienteByIdController } from '../factories/controller/cliente/load-cliente-by-id-controller-factory';
import { makeSaveClienteController } from '../factories/controller/cliente/save-cliente-controller-factory';
import { makeUpdateClienteController } from '../factories/controller/cliente/update-cliente-controller-factory';
import { makeDeleteClienteController } from '../factories/controller/cliente/delete-cliente-controlle-factory';
import { makeTransferirCarrosController } from '@/main/factories/controller/cliente/transferir-carros-controller-factory';
import { adminRole } from '@/main/middlewares/role-admin-middleware';

export default (router: Router): void => {
    router.get('/clientes', adminRole, expressRouterAdapter(makeLoadClientesController()));
    router.get('/clientes/:id', adminRole, expressRouterAdapter(makeLoadClienteByIdController()));
    router.post('/clientes', adminRole, expressRouterAdapter(makeSaveClienteController()));
    router.put('/clientes/:id', adminRole, expressRouterAdapter(makeUpdateClienteController()));
    router.delete('/clientes/:id', adminRole, expressRouterAdapter(makeDeleteClienteController()));
    router.post('/clientes/:id/carros/transferir', adminRole, expressRouterAdapter(makeTransferirCarrosController()));
};
