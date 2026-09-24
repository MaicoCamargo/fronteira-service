import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeSaveSimpleBillingIntegrationModel } from '../../../tests/mock/mock-save-simple-billing-model-integration';
import { makeIntegrationLoadSimpleBillingModel } from '../../../tests/mock/mock-integration-load-simple-billing-model';
import { LoadBillingsIntegrationParams } from '@/data/protocols/client/billing-service/load-billings-integration';
import { mockDateAdapter } from '../../../tests/helper/mock-date-adapter';
import { MomentAdapter } from '@/main/adapters/moment-adapter';

describe('Billing Service Integration', () => {
    describe('save()', () => {
        test('Should call AxiosHelper with the correct values', async () => {
            const { sut, axiosHelperStub } = makeSut();
            const spyOn = jest
                .spyOn(axiosHelperStub, 'post')
                .mockResolvedValue(makeIntegrationLoadSimpleBillingModel());
            await sut.save(makeSaveSimpleBillingIntegrationModel());
            expect(spyOn).toBeCalledWith('/billings/simple', makeSaveSimpleBillingIntegrationModel());
        });

        test('Should return a billing in the case of success', async () => {
            const { sut, axiosHelperStub } = makeSut();
            const spyOn = jest
                .spyOn(axiosHelperStub, 'post')
                .mockResolvedValueOnce(makeIntegrationLoadSimpleBillingModel());
            const billingModel = await sut.save(makeSaveSimpleBillingIntegrationModel());
            expect(billingModel).toEqual(makeIntegrationLoadSimpleBillingModel());
            expect(spyOn).toBeCalledWith('/billings/simple', makeSaveSimpleBillingIntegrationModel());
        });
    });

    describe('load()', () => {
        beforeAll(() => {
            mockDateAdapter.set(new Date());
        });

        afterAll(() => {
            mockDateAdapter.reset();
        });
        test('Should call AxiosHelper with the correct values', async () => {
            const { sut, axiosHelperStub } = makeSut();
            const spy = jest
                .spyOn(axiosHelperStub, 'get')
                .mockResolvedValue({ content: [makeIntegrationLoadSimpleBillingModel()] });
            const params: LoadBillingsIntegrationParams = {
                startDate: MomentAdapter.format(new Date()),
                endDate: MomentAdapter.format(new Date())
            };
            await sut.load(params);
            expect(spy).toBeCalledWith(`/billings/service/${ENV.SERVICE.ID}`, {
                startDate: MomentAdapter.format(),
                endDate: MomentAdapter.format()
            });
        });

        test('Should return billings filtered by the parameters in case of success', async () => {
            const { sut, axiosHelperStub } = makeSut();
            const spy = jest
                .spyOn(axiosHelperStub, 'get')
                .mockResolvedValueOnce({ content: [makeIntegrationLoadSimpleBillingModel()] });
            const params: LoadBillingsIntegrationParams = {
                startDate: MomentAdapter.format(new Date()),
                endDate: MomentAdapter.format(new Date())
            };
            expect(spy).toBeCalledWith(`/billings/service/${ENV.SERVICE.ID}`, {
                startDate: MomentAdapter.format(),
                endDate: MomentAdapter.format()
            });
            const billingModel = await sut.load(params);
            expect(billingModel.content).toEqual([makeIntegrationLoadSimpleBillingModel()]);
        });
    });
});

interface SutTypes {
    axiosHelperStub: AxiosHelper;
    sut: BillingServiceIntegration;
}

const makeAxiosHelperStub = (): AxiosHelper => {
    return AxiosHelper.getInstance(ENV.BILLING_SERVICE_HOST, 'Billing Service test');
};

const makeSut = (): SutTypes => {
    const axiosHelperStub = makeAxiosHelperStub();
    const sut = new BillingServiceIntegration(axiosHelperStub);
    return { axiosHelperStub, sut };
};
