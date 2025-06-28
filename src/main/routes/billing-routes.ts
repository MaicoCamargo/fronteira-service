import { Router } from 'express';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeSaveSimpleBillingController } from '@/main/factories/controller/billing/save-simple-billing-controller-factory';
import { makeLoadBillingsController } from '@/main/factories/controller/billing/load-billings-controller-factory';
import { makeUpdateBillingPaymentController } from '@/main/factories/controller/billing/update-billing-payment-controller-factory';
import { makeUpdateSimpleBillingController } from '@/main/factories/controller/billing/update-simple-billing-controller-factory';

export default (router: Router): void => {
    router.post('/billings', expressRouterAdapter(makeSaveSimpleBillingController()));
    router.get('/billings', expressRouterAdapter(makeLoadBillingsController()));
    router.patch('/billings/payment', expressRouterAdapter(makeUpdateBillingPaymentController()));
    router.put('/billings/:id', expressRouterAdapter(makeUpdateSimpleBillingController()));
};
