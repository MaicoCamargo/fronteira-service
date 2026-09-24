import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBilling, SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { ENV } from '@/main/config/env';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { ProfileModel } from '@/domain/models/profile-model';
import { RequestScopeRepository } from '@/data/protocols/scope/request-scope-repository';

export class IntegrationSaveSimpleBilling implements SaveSimpleBilling {
    constructor(
        private readonly saveBillingIntegration: SaveSimpleBillingIntegration,
        private readonly loadAuthDetailIntegration: LoadAuthDetailIntegration,
        private readonly loadProfileByUsernameRepository: LoadProfileByUsernameRepository,
        private readonly requestScopeRepository: RequestScopeRepository
    ) {}

    async save(params: SaveSimpleBillingParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
        // @todo montar 'name' no padrão: Fronteira service:${params.cliente.id}:${servico.carro.id}:${servico.valor}
        const profile = await this.loadAuthDetail();
        const billing: SaveSimpleBillingIntegrationModel = {
            service: Number(ENV.SERVICE.ID),
            user: profile.id,
            name: params.name ? params.name : `Fronteira service->order${params.order}`,
            description: params.description,
            amount: params.amount,
            order: String(params.order),
            payments: params.payments
        };
        return await this.saveBillingIntegration.save(billing);
    }

    private async loadAuthDetail(): Promise<ProfileModel> {
        const jwt = this.requestScopeRepository.getStore().authorization;
        const authDetailWrapper = await this.loadAuthDetailIntegration.load(jwt);
        const dbProfileModel = await this.loadProfileByUsernameRepository.loadByUsername(
            authDetailWrapper.content.username
        );
        return {
            ...dbProfileModel,
            id: dbProfileModel.id_profile,
            positions: []
        };
    }
}
