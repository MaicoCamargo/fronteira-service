import { AxiosHelper } from '@/infra/integration/axios-helper';
import { ENV } from '@/main/config/env';
import { BillingServiceIntegration } from '@/infra/integration/billing-service-integration';
import { makeSaveSimpleBillingIntegrationModel } from '../../../tests/mock/mock-save-simple-billing-model-integration';
import { makeIntegrationLoadSimpleBillingModel } from '../../../tests/mock/mock-integration-load-simple-billing-model';

describe('Billing Service Integration', () => {
    describe('save()', () => {
        test('Should call AxiosHelper with the correct values', async () => {
            const { sut, axiosHelperStub } = makeSut();
            const spyOn = jest.spyOn(axiosHelperStub, 'post');
            await sut.save(makeSaveSimpleBillingIntegrationModel());
            expect(spyOn).toBeCalledWith('/billings/simple', makeSaveSimpleBillingIntegrationModel());
        });

        test('Should return a billing in the case of success', async () => {
            const { sut, axiosHelperStub } = makeSut();
            jest.spyOn(axiosHelperStub, 'post').mockResolvedValueOnce(makeIntegrationLoadSimpleBillingModel());
            const billingModel = await sut.save(makeSaveSimpleBillingIntegrationModel());
            expect(billingModel).toEqual(makeIntegrationLoadSimpleBillingModel());
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
