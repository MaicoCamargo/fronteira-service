import { Controller } from '@/presentation/protocols';
import { LoadMyMechanicShopController } from '@/presentation/controllers/mechanic-shop/load-my-mechanic-shop-controller';
import { makeDbLoadMechanicShopByOwnerId } from '@/main/factories/usescase/mechanic-shop/db-load-mechanic-shop-by-owner-id-factory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';

export const makeLoadMyMechanicShopController = (): Controller => {
    return makeLogControllerDecorator(new LoadMyMechanicShopController(makeDbLoadMechanicShopByOwnerId()));
};
