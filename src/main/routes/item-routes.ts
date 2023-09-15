import { expressRouterAdapter } from '../adapters/express-router-adapter';
import { LoadItensController } from '../../presentation/controllers/item/load-itens-controller';
import { makeDbLoadItens } from '../factories/usescase/item/db-load-itens-factory';
import { Router } from 'express';

export default (router: Router): void => {
    router.get('/itens', expressRouterAdapter(new LoadItensController(makeDbLoadItens())));
};
