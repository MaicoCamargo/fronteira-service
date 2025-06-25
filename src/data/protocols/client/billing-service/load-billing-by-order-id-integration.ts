import { Wrapper } from '@/main/protocols/http-wrapper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';

export interface LoadBillingByOrderIdIntegration {
    loadByOrderId: (order: number) => Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>>;
}
