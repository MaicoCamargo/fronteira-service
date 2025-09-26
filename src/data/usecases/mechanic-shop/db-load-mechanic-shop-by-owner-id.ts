import { LoadMechanicShopByOwnerId } from '@/domain/usecases/mechanic-shop/load-mechanic-shop-by-owner-id';
import { LoadMechanicShopByOwnerIdRepository } from '@/data/protocols/db/mechanic-shop/load-mechanic-shop-by-owner-id-repository';
import { MechanicShopModel } from '@/domain/models/mechanic-shop-model';
import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { httpRequestScope } from '@/infra/http/http-request-scope';
import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { LoadEnderecoByIdRepository } from '@/data/protocols/db/endereco/load-endereco-by-id-repository';
import { EnderecoModel } from '@/domain/models/endereco-model';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class DbLoadMechanicShopByOwnerId implements LoadMechanicShopByOwnerId {
    constructor(
        private readonly loadMechanicShopByOwnerIdRepository: LoadMechanicShopByOwnerIdRepository,
        private readonly loadAuthDetailIntegration: LoadAuthDetailIntegration,
        private readonly loadProfileByUsernameRepository: LoadProfileByUsernameRepository,
        private readonly loadEnderecoByIdRepository: LoadEnderecoByIdRepository
    ) {}

    async load(ownerId?: number): Promise<Wrapper<MechanicShopModel>> {
        if (!ownerId) {
            const scopeData = httpRequestScope.getStore();
            const wrapper = await this.loadAuthDetailIntegration.load(scopeData.authorization);
            const ownerProfile = await this.loadProfileByUsernameRepository.loadByUsername(wrapper.content.username);
            ownerId = ownerProfile.id_profile;
        }
        const dbMechanicShopModel = await this.loadMechanicShopByOwnerIdRepository.loadByOwnerId(ownerId);
        return {
            content: {
                id: dbMechanicShopModel.id_mechanic_shop,
                document: dbMechanicShopModel.document,
                name: dbMechanicShopModel.name,
                description: dbMechanicShopModel.description,
                logo: dbMechanicShopModel.logo,
                address: await this.loadAddress(dbMechanicShopModel.endereco_id)
            }
        };
    }

    private async loadAddress(id: number): Promise<EnderecoModel> {
        const dbEnderecoModel = await this.loadEnderecoByIdRepository.loadById(id);
        return {
            ...dbEnderecoModel,
            id: dbEnderecoModel.id_endereco
        };
    }
}
