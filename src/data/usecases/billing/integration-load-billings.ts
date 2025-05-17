import { LoadBillingsIntegration } from '@/data/protocols/client/billing-service/load-billings-integration';
import { LoadBillings, LoadBillingsParams } from '@/domain/usecases/billing/load-billings';
import { Wrapper } from '@/main/protocols/http-wrapper';

export class IntegrationLoadBillings implements LoadBillings {
    constructor(private readonly loadBillingsIntegration: LoadBillingsIntegration) {}

    async load(params: LoadBillingsParams): Promise<Wrapper<any>> {
        return await this.loadBillingsIntegration.load(params);
    }
}
