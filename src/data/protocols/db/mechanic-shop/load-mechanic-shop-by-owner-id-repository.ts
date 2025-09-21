import { DbMechanicShopModel } from '@/data/models/db-mechanic-shop-model';

export interface LoadMechanicShopByOwnerIdRepository {
    loadByOwnerId: (ownerId: number) => Promise<DbMechanicShopModel>;
}
