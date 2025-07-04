import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { SaveSimpleBillingParams } from '@/domain/usecases/billing/save-simple-billing';

export interface UpdateSimpleBilling {
    update: (id: number, billing: SaveSimpleBillingParams) => Promise<Wrapper<IntegrationLoadSimpleBillingModel>>;
}
