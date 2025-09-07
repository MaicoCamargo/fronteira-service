import { Router } from 'express';
import { adminRole } from '@/main/middlewares/role-admin-middleware';
import { expressRouterAdapter } from '@/main/adapters/express-router-adapter';
import { makeSaveProfileController } from '@/main/factories/controller/profile/save-profile-controller-factory';
import { makeLoadProfilesController } from '@/main/factories/controller/profile/load-profiles-controller-factory';

export default (router: Router): void => {
    router.post('/profiles', adminRole, expressRouterAdapter(makeSaveProfileController()));
    router.get('/profiles', adminRole, expressRouterAdapter(makeLoadProfilesController()));
};
