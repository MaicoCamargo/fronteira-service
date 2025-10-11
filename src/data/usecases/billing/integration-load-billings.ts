import {
    LoadBillingsIntegration,
    LoadBillingsIntegrationParams
} from '@/data/protocols/client/billing-service/load-billings-integration';
import { LoadBillings, LoadBillingsParams } from '@/domain/usecases/billing/load-billings';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { BillingModel } from '@/domain/models/billing-model';
import { MomentAdapter } from '@/main/adapters/moment-adapter';
import { LoadServicosRepository } from '@/data/protocols/db/servico/load-servicos-repository';

export class IntegrationLoadBillings implements LoadBillings {
    constructor(
        private readonly loadBillingsIntegration: LoadBillingsIntegration,
        private readonly loadServicosRepository: LoadServicosRepository
    ) {}

    async load(params: LoadBillingsParams): Promise<Wrapper<BillingModel[]>> {
        const queryParams: LoadBillingsIntegrationParams = {
            user: params.user,
            status: params.status,
            page: params.page,
            size: params.size,
            code: params.code
        };
        if (params.startDate) {
            queryParams.startDate = MomentAdapter.format(params.startDate);
        }
        if (params.endDate) {
            queryParams.endDate = MomentAdapter.format(params.endDate);
        }
        if (params.order) {
            const wrapperDbOrderModel = await this.loadServicosRepository.load({ params: { code: params.code } });
            if (wrapperDbOrderModel.content.length > 0) {
                queryParams.order = wrapperDbOrderModel.content[0].id_servico;
            }
        }

        const wrapper = await this.loadBillingsIntegration.load(queryParams);
        const billings: BillingModel[] = wrapper.content.map((loaded) => ({
            id: loaded.id,
            name: loaded.name,
            description: loaded.description,
            amount: loaded.amount,
            order: loaded.order,
            createdAt: loaded.createdAt,
            user: loaded.user,
            payments: loaded.payments.map((payment) => ({
                id: payment.id,
                value: payment.value,
                installment: payment.installment,
                type: {
                    name: payment.type.name,
                    id: payment.type.id
                },
                expirationDate: payment.expirationDate,
                status: {
                    name: payment.status.name,
                    id: payment.status.id,
                    date: payment.status.date
                }
            })),
            status: loaded.status,
            code: loaded.code
        }));

        return { content: billings, pagination: wrapper.pagination };
    }
}
