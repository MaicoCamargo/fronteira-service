import { Router } from 'express';
import { expressRouterAdapter as adaptRoute } from '../adapters/express-router-adapter';
import { makeAddContactUsController } from '../factories/controller/contact-us/add-contact-us-controller-factory';

export default (router: Router): void => {
    router.post('/contact-us', adaptRoute(makeAddContactUsController()));
};
