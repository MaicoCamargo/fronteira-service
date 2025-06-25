import { LoadServicosDbFilter, LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';
import { DbLoadServicos } from './db-load-servicos';
import { mockFakeDbServicoModelList, mockFakeServicoModelList } from '../../../../tests/mock/mock-servico';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbServicoModel } from '../../models/db-servico-model';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { DbCarroModel } from '../../models/db-carro-model';
import { mockFakeDbCarroModel } from '../../../../tests/mock/mock-carro';
import { throwError } from '../../../../tests/helper/test-helper';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { DbIncludedItemModel } from '../../models/db-included-item-model';
import { mockFakeDbIncludedItemModelList } from '../../../../tests/mock/mock-included-itens';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import { DbClienteModel } from '../../models/db-cliente-model';
import { mockFakeDbClienteModel } from '../../../../tests/mock/mock-cliente';
import { Filter } from '../../../main/protocols/filter';
import { LoadServicosParams } from '@/domain/usecases/servico/load-servicos';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { mockFakeDbMechanicModelList } from '../../../../tests/mock/mock-mechanic';
import {
    LoadBillingsIntegration,
    LoadBillingsIntegrationParams
} from '@/data/protocols/client/billing-service/load-billings-integration';
import { IntegrationLoadSimpleBillingModel } from '@/data/models/integration-load-simple-billing-model';
import { makeIntegrationLoadSimpleBillingModel } from '../../../../tests/mock/mock-integration-load-simple-billing-model';
import { LoadBillingByOrderIdIntegration } from '@/data/protocols/client/billing-service/load-billing-by-order-id-integration';

describe('DbLoadServicos Use Case', () => {
    beforeAll(() => {
        mockDateAdapter.set(new Date());
    });

    afterAll(() => {
        mockDateAdapter.reset();
    });

    test('Deve chamar LoadServicosRepository', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadServicosRepositoryStub, 'load');
        await sut.load();
        expect(loadSpy).toHaveBeenCalled();
    });

    test('Deve retornar uma lista de serviços em caso de sucesso', async () => {
        const { sut } = makeSut();
        const { content: servicos } = await sut.load();
        expect(servicos[0]).toEqual(mockFakeServicoModelList()[0]);
        expect(servicos.length).toEqual(mockFakeServicoModelList().length);
    });

    test('Deve chamar LoadServicosRepository com valores corretos', async () => {
        const params: LoadServicosParams = {
            page: 1,
            size: 10,
            modelo: 'opala',
            cliente: 'cliente'
        } as LoadServicosParams;
        const dbFilter: Filter<LoadServicosDbFilter> = {
            pageFilter: {
                page: params.page,
                size: params.size
            },
            params: {
                modelo: params.modelo,
                cliente: params.cliente
            }
        };
        const { sut, loadServicosRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadServicosRepositoryStub, 'load');
        await sut.load(params);
        expect(loadSpy).toHaveBeenCalledWith(dbFilter);
    });

    test('Deve lançar exceção de LoadServicosRepository caso ocorra exceção', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        jest.spyOn(loadServicosRepositoryStub, 'load').mockImplementationOnce(throwError);
        const promise = sut.load();
        await expect(promise).rejects.toThrow();
    });

    test('Deve retornar uma lista vazia caso nao existir servicos para listar', async () => {
        const { sut, loadServicosRepositoryStub } = makeSut();
        jest.spyOn(loadServicosRepositoryStub, 'load').mockReturnValueOnce(Promise.resolve({ content: [] }));
        const { content: servicos } = await sut.load();
        expect(servicos).toEqual([]);
    });

    describe('loadCarroById()', () => {
        test('Deve chamar LoadCarroByIdRepository com valores corretos', async () => {
            const { sut, loadCarroByIdRepositoryStub } = makeSut();
            const loadByIdSpy = jest.spyOn(loadCarroByIdRepositoryStub, 'loadById');
            await sut.load();
            expect(loadByIdSpy).toHaveBeenCalledWith({ id_carro: mockFakeServicoModelList()[0].carro.id });
        });

        test('Deve lançar exceção de LoadCarroByIdRepository caso ocorra exceção', async () => {
            const { sut, loadCarroByIdRepositoryStub } = makeSut();
            jest.spyOn(loadCarroByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
            const promise = sut.load();
            await expect(promise).rejects.toThrow();
        });

        test('Deve retornar um carro em caso de sucesso', async () => {
            const { sut } = makeSut();
            const carro = await sut.load();
            expect(carro.content[0].carro).toEqual(mockFakeServicoModelList()[0].carro);
        });

        test('Deve retornar null caso não encontrar um carro', async () => {
            const { sut, loadCarroByIdRepositoryStub } = makeSut();
            jest.spyOn(loadCarroByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
            const carro = await sut.load();
            expect(carro.content[0].carro).toBeNull();
        });
    });

    describe('loadCliente()', () => {
        test('Deve chamar LoadClienteByIdServicoRepository com valores corretos', async () => {
            const { sut, loadClienteByIdServicoRepositoryStub } = makeSut();
            const loadByIdSpy = jest.spyOn(loadClienteByIdServicoRepositoryStub, 'loadByIdServico');
            await sut.load();
            expect(loadByIdSpy).toHaveBeenCalledWith(mockFakeServicoModelList()[0].id);
        });
    });

    describe('loadMechanics()', () => {
        test('Deve chamar LoadMechanicsByIdServicoRepository com valores corretos', async () => {
            const { sut, loadMechanicsByIdServicoRepositoryStub } = makeSut();
            const loadSpy = jest.spyOn(loadMechanicsByIdServicoRepositoryStub, 'loadByIdServico');
            await sut.load();
            expect(loadSpy).toHaveBeenCalledWith(mockFakeServicoModelList()[0].id);
        });

        test('Deve retornar uma lista vazia caso não encontrar mecânicos', async () => {
            const { sut, loadMechanicsByIdServicoRepositoryStub } = makeSut();
            jest.spyOn(loadMechanicsByIdServicoRepositoryStub, 'loadByIdServico').mockReturnValueOnce(
                Promise.resolve({ content: [] })
            );
            const carro = await sut.load();
            expect(carro.content[0].mecanicos).toHaveLength(0);
        });

        test('Deve retornar uma lista de mecânicos em caso de sucesso', async () => {
            const { sut, loadMechanicsByIdServicoRepositoryStub } = makeSut();
            jest.spyOn(loadMechanicsByIdServicoRepositoryStub, 'loadByIdServico').mockReturnValueOnce(
                Promise.resolve({ content: mockFakeDbMechanicModelList() })
            );
            const carro = await sut.load();
            expect(carro.content[0].mecanicos).toHaveLength(2);
        });
    });

    describe('loadBilling()', () => {
        test('Deve retornar null caso loadBillingByOrderIdIntegration retornar uma lista vazia', async () => {
            const { sut, loadBillingByOrderIdIntegrationStub } = makeSut();
            /*@todo API para retorna [] em vez de null*/
            jest.spyOn(loadBillingByOrderIdIntegrationStub, 'loadByOrderId').mockResolvedValueOnce({ content: [] });
            const { content: servicos } = await sut.load();
            expect(servicos[0].billing).toBeNull();
        });
    });
});

interface SutTypes {
    sut: DbLoadServicos;
    loadServicosRepositoryStub: LoadServicosRepository;
    loadCarroByIdRepositoryStub: LoadCarroByIdRepository;
    loadIncludedItensRepositoryStub: LoadIncludedItensRepository;
    loadClienteByIdServicoRepositoryStub: LoadClienteByIdServicoRepository;
    loadNotaFiscalByIdServicoRepositoryStub: LoadNotaFiscalByIdServicoRepository;
    loadMechanicsByIdServicoRepositoryStub: LoadMechanicsByIdServicoRepository;
    loadBillingByOrderIdIntegrationStub: LoadBillingByOrderIdIntegration;
}

const makeSut = (): SutTypes => {
    const loadServicosRepositoryStub = makeLoadServicosRepository();
    const loadCarroByIdRepositoryStub = makeLoadCarroByIdRepository();
    const loadIncludedItensRepositoryStub = makeLoadIncludedItensRepository();
    const loadClienteByIdServicoRepositoryStub = makeLoadClienteByIdServicoRepository();
    const loadNotaFiscalByIdServicoRepositoryStub = makeLoadNotaFiscalByIdServicoRepository();
    const loadMechanicsByIdServicoRepositoryStub = makeLoadMechanicsByIdServicoRepository();
    const loadBillingByOrderIdIntegrationStub = makeLoadBillingByOrderIdIntegration();
    const sut = new DbLoadServicos(
        loadServicosRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadIncludedItensRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub,
        loadBillingByOrderIdIntegrationStub
    );
    return {
        sut,
        loadServicosRepositoryStub,
        loadCarroByIdRepositoryStub,
        loadIncludedItensRepositoryStub,
        loadClienteByIdServicoRepositoryStub,
        loadNotaFiscalByIdServicoRepositoryStub,
        loadMechanicsByIdServicoRepositoryStub,
        loadBillingByOrderIdIntegrationStub
    };
};

const makeLoadIncludedItensRepository = (): LoadIncludedItensRepository => {
    class LoadIncludedItensRepositoryStub implements LoadIncludedItensRepository {
        async load(servicoId: number): Promise<DbIncludedItemModel[]> {
            return mockFakeDbIncludedItemModelList();
        }
    }

    return new LoadIncludedItensRepositoryStub();
};

const makeLoadServicosRepository = (): LoadServicosRepository => {
    class LoadServicosRepositoryStub implements LoadServicosRepository {
        load(filters: Filter<LoadServicosDbFilter> | undefined): Promise<Wrapper<DbServicoModel[]>> {
            const wrapper: Wrapper<DbServicoModel[]> = { content: mockFakeDbServicoModelList() };
            return Promise.resolve(wrapper);
        }
    }

    return new LoadServicosRepositoryStub();
};

const makeLoadCarroByIdRepository = (): LoadCarroByIdRepository => {
    class LoadCarroByIdRepositoryStub implements LoadCarroByIdRepository {
        loadById({ id_carro: number }): Promise<DbCarroModel> {
            return Promise.resolve(mockFakeDbCarroModel());
        }
    }

    return new LoadCarroByIdRepositoryStub();
};

const makeLoadClienteByIdServicoRepository = (): LoadClienteByIdServicoRepository => {
    class LoadClienteByIdServicoRepositoryStub implements LoadClienteByIdServicoRepository {
        loadByIdServico(servicoId: number): Promise<DbClienteModel> {
            return Promise.resolve(mockFakeDbClienteModel());
        }
    }

    return new LoadClienteByIdServicoRepositoryStub();
};

const makeLoadNotaFiscalByIdServicoRepository = (): LoadNotaFiscalByIdServicoRepository => {
    class LoadNotaFiscalByIdServicoRepositoryStub implements LoadNotaFiscalByIdServicoRepository {
        load(idServico: number): Promise<boolean> {
            return Promise.resolve(false);
        }
    }

    return new LoadNotaFiscalByIdServicoRepositoryStub();
};

const makeLoadMechanicsByIdServicoRepository = (): LoadMechanicsByIdServicoRepository => {
    class LoadMechanicsByIdServicoRepositoryStub implements LoadMechanicsByIdServicoRepository {
        async loadByIdServico(servico: number): Promise<Wrapper<DbMechanicModel[]>> {
            return {
                content: mockFakeDbMechanicModelList()
            };
        }
    }

    return new LoadMechanicsByIdServicoRepositoryStub();
};

const makeLoadBillingByOrderIdIntegration = (): LoadBillingByOrderIdIntegration => {
    class LoadBillingByOrderIdIntegrationStub implements LoadBillingByOrderIdIntegration {
        async loadByOrderId(order: number): Promise<Wrapper<IntegrationLoadSimpleBillingModel[]>> {
            return { content: [makeIntegrationLoadSimpleBillingModel()] };
        }
    }

    return new LoadBillingByOrderIdIntegrationStub();
};
