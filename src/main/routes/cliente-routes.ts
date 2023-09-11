import { Router } from 'express';
import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadClientesController } from '../factories/controller/load-clientes-controller-factory';
import { makeLoadClienteByIdController } from '../factories/controller/load-cliente-by-id-controller-factory';
import { makeSaveClienteController } from '../factories/controller/save-cliente-controller-factory';
import { makeUpdateClienteController } from '../factories/controller/update-cliente-controller-factory';
import { makeDeleteClienteController } from '../factories/controller/delete-cliente-controlle-factory';

export default (router: Router): void => {
    router.get('/clientes', expressRouterAdapter(makeLoadClientesController()));
    router.get('/clientes/:id', expressRouterAdapter(makeLoadClienteByIdController()));
    router.post('/clientes', expressRouterAdapter(makeSaveClienteController()));
    router.put('/clientes', expressRouterAdapter(makeUpdateClienteController()));
    router.delete('/clientes/:id', expressRouterAdapter(makeDeleteClienteController()));
};
