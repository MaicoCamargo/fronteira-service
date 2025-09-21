import { MechanicShopModel } from '@/domain/models/mechanic-shop-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

export interface LoadMechanicShopByOwnerId {
    load: (ownerId?: number) => Promise<Wrapper<MechanicShopModel>>;
}
