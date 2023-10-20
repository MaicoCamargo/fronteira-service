import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { makeLoadServicosController } from '../factories/controller/load-servicos-controller-factory';
import { Router } from 'express';
import { makeSaveServicoController } from '../factories/controller/save-servico-controller-factory';
import { makeUpdateServicoController } from '../factories/controller/update-servico-controller-factory';
import { makeDeleteServicoController } from '../factories/controller/delete-servico-controller-factory';

export default (router: Router): void => {
    router.get('/servicos', expressRouterAdapter(makeLoadServicosController()));
    router.post('/servicos', expressRouterAdapter(makeSaveServicoController()));
    router.put('/servicos/:id', expressRouterAdapter(makeUpdateServicoController()));
    router.delete('/servicos/:id', expressRouterAdapter(makeDeleteServicoController()));
};
