import { IntegrationLoadBillings } from '@/data/usecases/billing/integration-load-billings';
import {
    LoadBillingsIntegration,
    LoadBillingsIntegrationParams
} from '@/data/protocols/client/billing-service/load-billings-integration';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { makeIntegrationLoadSimpleBillingModel } from '../../../../tests/mock/mock-integration-load-simple-billing-model';
import { MomentAdapter } from '@/main/adapters/moment-adapter';
import { LoadServicosRepository } from '@/data/protocols/db/servico/load-servicos-repository';

const makeLoadBillingsIntegration = () => {
    class LoadBillingsIntegrationStub implements LoadBillingsIntegration {
        async load(_: LoadBillingsIntegrationParams): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
            return {
                content: [makeIntegrationLoadSimpleBillingModel()],
                pagination: {
                    total: 1,
                    lastPage: 1,
                    prevPage: 0,
                    nextPage: 0,
                    perPage: 10,
                    currentPage: 1,
                    totalItemPage: 1
                }
            };
        }
    }
    return new LoadBillingsIntegrationStub();
};

const makeLoadServicosRepository = (idServico: number | null = 1) => {
    class LoadServicosRepositoryStub implements LoadServicosRepository {
        async load(): Promise<Wrapper<any[]>> {
            return { content: idServico !== null ? [{ id_servico: idServico }] : [], pagination: undefined } as any;
        }
    }
    return new LoadServicosRepositoryStub();
};

describe('IntegrationLoadBillings (usecase)', () => {
    test('should call integration with formatted dates and order from repository when order flag provided', async () => {
        const loadIntegration = makeLoadBillingsIntegration();
        const loadServicosRepository = makeLoadServicosRepository(123);
        const sut = new IntegrationLoadBillings(loadIntegration, loadServicosRepository);

        const formatSpy = jest.spyOn(MomentAdapter, 'format');
        // Mock concrete formatted outputs to assert forwarded values
        formatSpy.mockReturnValueOnce('2025-01-01').mockReturnValueOnce('2025-01-31');

        const params = {
            service: 99,
            status: 'COMPLETED',
            user: 7,
            page: 2,
            size: 50,
            code: 'O123',
            order: 'any',
            startDate: new Date('2025-01-01T10:00:00Z'),
            endDate: new Date('2025-01-31T23:59:59Z')
        } as any;

        const integrationSpy = jest.spyOn(loadIntegration, 'load');

        const wrapper = await sut.load(params);

        expect(formatSpy).toHaveBeenNthCalledWith(1, params.startDate);
        expect(formatSpy).toHaveBeenNthCalledWith(2, params.endDate);
        expect(integrationSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                status: params.status,
                user: params.user,
                page: params.page,
                size: params.size,
                code: params.code,
                startDate: '2025-01-01',
                endDate: '2025-01-31',
                order: 123
            })
        );

        // Mapping assertion
        expect(wrapper.content[0]).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                amount: expect.any(Number),
                order: expect.any(Number),
                createdAt: expect.any(Date),
                user: expect.any(Number),
                payments: [
                    expect.objectContaining({
                        id: expect.any(Number),
                        value: expect.any(Number),
                        installment: expect.any(Number),
                        type: expect.objectContaining({ name: expect.any(String), id: expect.any(Number) }),
                        expirationDate: expect.any(Date),
                        status: expect.objectContaining({
                            name: expect.any(String),
                            id: expect.any(Number),
                            date: expect.any(Date)
                        })
                    })
                ],
                status: expect.any(String),
                code: expect.any(String)
            })
        );
    });

    test('should NOT look up order when order flag is not provided', async () => {
        const loadIntegration = makeLoadBillingsIntegration();
        const loadServicosRepository = makeLoadServicosRepository(123);
        const sut = new IntegrationLoadBillings(loadIntegration, loadServicosRepository);

        const repoSpy = jest.spyOn(loadServicosRepository, 'load');
        const integrationSpy = jest.spyOn(loadIntegration, 'load');

        await sut.load({ service: 1, page: 1, size: 10 } as any);

        expect(repoSpy).not.toHaveBeenCalled();
        expect(integrationSpy).toHaveBeenCalledWith(expect.not.objectContaining({ order: expect.anything() }));
    });

    test('should skip order param when repository returns empty content', async () => {
        const loadIntegration = makeLoadBillingsIntegration();
        const loadServicosRepository = makeLoadServicosRepository(null);
        const sut = new IntegrationLoadBillings(loadIntegration, loadServicosRepository);

        const integrationSpy = jest.spyOn(loadIntegration, 'load');

        await sut.load({ service: 1, order: 'any', code: 'O321' } as any);

        expect(integrationSpy).toHaveBeenCalledWith(expect.not.objectContaining({ order: expect.anything() }));
    });
});
