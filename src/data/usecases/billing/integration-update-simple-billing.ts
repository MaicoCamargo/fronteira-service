import { SaveSimpleBillingIntegrationModel } from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { ENV } from '@/main/config/env';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { UpdateSimpleBilling } from '@/domain/usecases/billing/update-simple-billing';
import { UpdateSimpleBillingIntegration } from '@/data/protocols/client/billing-service/update-simple-billing-integration';
import { ProfileModel } from '@/domain/models/profile-model';
import { LoadAuthDetailIntegration } from '@/data/protocols/client/auth-service/load-auth-detail-integration';
import { LoadProfileByUsernameRepository } from '@/data/protocols/db/profile/load-profile-by-username-repository';
import { RequestScopeRepository } from '@/data/protocols/scope/request-scope-repository';

export class IntegrationUpdateSimpleBilling implements UpdateSimpleBilling {
    constructor(
        private readonly updateSimpleBillingIntegration: UpdateSimpleBillingIntegration,
        private readonly loadAuthDetailIntegration: LoadAuthDetailIntegration,
        private readonly loadProfileByUsernameRepository: LoadProfileByUsernameRepository,
        private readonly requestScopeRepository: RequestScopeRepository
    ) {}

    async update(code: string, params: SaveSimpleBillingParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel>> {
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
        return await this.updateSimpleBillingIntegration.update(code, billing);
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
