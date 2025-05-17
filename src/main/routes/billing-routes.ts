import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeSaveSimpleBillingController } from '@/main/factories/controller/billing/save-simple-billing-controller-factory';

export default (router: Router): void => {
    router.post('/billings', () => expressRouterAdapter(makeSaveSimpleBillingController()));
};
