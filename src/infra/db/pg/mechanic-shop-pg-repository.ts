import { LoadMechanicShopByOwnerIdRepository } from '@/data/protocols/db/mechanic-shop/load-mechanic-shop-by-owner-id-repository';
import { DbMechanicShopModel } from '@/data/models/db-mechanic-shop-model';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';

export class MechanicShopPgRepository implements LoadMechanicShopByOwnerIdRepository {
    async loadByOwnerId(ownerId: number): Promise<DbMechanicShopModel> {
        return await KnexHelper.forTenant()
            .table('mechanic_shop')
            .whereNull('dh_exclusion')
            .where({ owner_id: ownerId })
            .first();
    }
}
