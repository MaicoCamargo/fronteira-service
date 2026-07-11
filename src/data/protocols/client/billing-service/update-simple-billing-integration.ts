import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { SaveSimpleBillingIntegrationModel } from '@/data/protocols/client/billing-service/save-simple-billing-integration';

export interface UpdateSimpleBillingIntegration {
    update: (
        code: string,
        billing: SaveSimpleBillingIntegrationModel
    ) => Promise<Wrapper<IntegrationLoadSimpleBillingModel>>;
}
