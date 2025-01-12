import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadServicosController } from '../factories/controller/servico/load-servicos-controller-factory';
import { Router } from 'express';
import { makeSaveServicoController } from '../factories/controller/servico/save-servico-controller-factory';
import { makeUpdateServicoController } from '../factories/controller/servico/update-servico-controller-factory';
import { makeDeleteServicoController } from '../factories/controller/servico/delete-servico-controller-factory';
import { adminRole } from '@/main/middlewares/role-admin-middleware';

export default (router: Router): void => {
    router.get('/servicos', adminRole, expressRouterAdapter(makeLoadServicosController()));
    router.post('/servicos', adminRole, expressRouterAdapter(makeSaveServicoController()));
    router.put('/servicos/:id', adminRole, expressRouterAdapter(makeUpdateServicoController()));
    router.delete('/servicos/:id', adminRole, expressRouterAdapter(makeDeleteServicoController()));
};
