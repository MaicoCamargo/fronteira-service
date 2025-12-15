import { ServicoPgRepository } from '@/infra/db/pg/servico-pg-repository';
import { DbServicoModel } from '@/data/models/db-servico-model';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { PageFilter } from '@/main/protocols/page-filter';
import { Filter } from '@/main/protocols/filter';
import { LoadServicosDbFilter } from '@/data/protocols/db/servico/load-servicos-repository';
import { DbClienteModel } from '@/data/models/db-cliente-model';
import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';
import { DbCarroModel } from '@/data/models/db-carro-model';

describe('Servico Postgres Repository', () => {
    let servicos: DbServicoModel[];
    let cliente: DbClienteModel;
    let car: DbCarroModel;
    let first: DbServicoModel;

    beforeAll(async () => {
        mockDateAdapter.set(new Date());
        await KnexHelper.forTenant().table('cliente_carro').del();
        await KnexHelper.forTenant().table('servico_mecanico').del();
        await KnexHelper.forTenant().table('servico_peca').del();
        await KnexHelper.forTenant().table('nota_fiscal').del();
        await KnexHelper.forTenant().table('servico').del();
        await KnexHelper.forTenant().table('carro').del();
        await KnexHelper.forTenant().table('cliente').del();
        servicos = await makePgServicoCreate();
        cliente = await loadExistingClient();
        first = sortByLatestDate(servicos)[0];
        car = await loadExistingCar(first.carro_id);
    });

    afterAll(async () => {
        mockDateAdapter.reset();
        await KnexHelper.destroy();
    });

    describe('load()', () => {
        test('Deve retornar uma lista de serviços em caso de sucesso', async () => {
            const sut = makeSut();
            const wrapper = await sut.load();
            expect(sortByLatestDate(servicos)).toEqual(wrapper.content);
            expect(servicos.length).toEqual(wrapper.content.length);
        });

        test('Deve retornar uma lista vazia caso não exista serviços', async () => {
            const sut = makeSut();
            jest.spyOn(sut, 'load').mockResolvedValueOnce({ content: [] });
            const wrapper = await sut.load();
            expect(wrapper.content).toEqual([]);
            expect(wrapper.content.length).toEqual(0);
        });

        test('Deve retornar uma lista de serviços paginada em caso de sucesso', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 2 };
            const wrapper = await sut.load({ pageFilter });
            expect(sortByLatestDate(servicos)).toEqual(wrapper.content);
            expect(servicos.length).toEqual(wrapper.content.length);
            expect(wrapper.pagination.total).toEqual(servicos.length);
            expect(wrapper.pagination.perPage).toEqual(pageFilter.size);
            expect(wrapper.pagination.currentPage).toEqual(pageFilter.page);
            expect(wrapper.pagination.nextPage).toBeNull();
            expect(wrapper.pagination.prevPage).toBeNull();
            expect(wrapper.pagination.from).toEqual(0);
            expect(wrapper.pagination.to).toEqual(servicos.length);
            expect(wrapper.pagination.lastPage).toEqual(1);
        });

        test('Deve retornar uma lista de serviços filtros por um range de datas', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };
            const today = new Date();

            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
                    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect(sortByLatestDate(servicos)).toEqual(wrapper.content);
            expect(servicos.length).toEqual(wrapper.content.length);
            expect(wrapper.pagination.total).toEqual(servicos.length);
        });

        test('Deve retornar um serviço filtrado pelo código', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };

            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    code: first.codigo
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect([first]).toEqual(wrapper.content);
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.pagination.total).toEqual(1);
        });

        test('Deve retornar um serviço filtrado pelo cliente', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };
            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    cliente: cliente.nome
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect(servicos).toEqual(wrapper.content);
            expect(wrapper.content.length).toEqual(servicos.length);
            expect(wrapper.pagination.total).toEqual(servicos.length);
        });

        test('Deve retornar um serviço filtrado pelos clientes', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };
            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    clientes: [cliente.id_cliente]
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect(servicos).toEqual(wrapper.content);
            expect(wrapper.content.length).toEqual(servicos.length);
            expect(wrapper.pagination.total).toEqual(servicos.length);
        });

        test('Deve retornar um serviço filtrado pela placa', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };
            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    placa: car.placa
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.pagination.total).toEqual(1);
            expect([first]).toEqual(wrapper.content);
        });

        test('Deve retornar um serviço filtrado pelo modelo', async () => {
            const sut = makeSut();
            const pageFilter: PageFilter = { page: 1, size: 5 };
            const filters: Filter<LoadServicosDbFilter> = {
                params: {
                    modelo: car.modelo
                },
                pageFilter
            };
            const wrapper = await sut.load(filters);
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.pagination.total).toEqual(1);
            expect([first]).toEqual(wrapper.content);
        });
    });

    describe('save()', () => {
        test('Deve retornar um serviço em caso de sucesso', async () => {
            const sut = makeSut();
            const result = await sut.save({
                valor: 10,
                descricao: 'any_descricao',
                quilometragem: 100,
                carro_id: first.carro_id,
                code: '#SA1B2C'
            });
            expect(result.id_servico).toBeTruthy();
            expect(result.valor).toEqual(10);
            expect(result.descricao).toEqual('any_descricao');
            expect(result.data).toEqual(new Date());
            expect(result.quilometragem).toEqual(100);
            expect(result.carro_id).toEqual(first.carro_id);
        });
    });

    describe('update()', () => {
        test('Deve editar em caso de sucesso', async () => {
            const sut = makeSut();
            const result = await sut.update({
                id_servico: servicos[0].id_servico,
                valor: 10,
                descricao: 'other_descricao',
                quilometragem: 100,
                carro_id: servicos[0].carro_id
            });
            expect(result.id_servico).toBeTruthy();
            expect(result.valor).toEqual(10);
            expect(result.descricao).toEqual('other_descricao');
            expect(result.data).toEqual(servicos[0].data);
            expect(result.quilometragem).toEqual(100);
            expect(result.carro_id).toEqual(servicos[0].carro_id);
        });
    });

    describe('delete()', () => {
        test('Deve deletar em caso de sucesso', async () => {
            const sut = makeSut();
            await sut.delete(servicos[0].id_servico);
            const servico = await KnexHelper.forTenant()
                .table('servico')
                .where({ id_servico: servicos[0].id_servico })
                .first();
            expect(servico).toBeTruthy();
            expect(servico.dh_exclusion).toBeTruthy();
            expect(servico.dh_exclusion).not.toBeNull();
        });
    });
});

/**
 * ordena lista de serviços
 * @param servicos
 * @return serviços ordenados pela data mais recente
 */
const sortByLatestDate = (servicos: DbServicoModel[]): DbServicoModel[] => {
    return servicos.sort((a, b) => {
        return b.data.getTime() - a.data.getTime(); // Ordena pela data
    });
};

const makeSut = (): ServicoPgRepository => {
    return new ServicoPgRepository();
};

/**
 * Asynchronously loads an existing client record from the database.
 * uses a tenant-specific table within the database to fetch the first available client record.
 *
 * @async
 * @function
 * @returns {Promise<DbClienteModel>} A promise that resolves to a `DbClienteModel` representing the client record.
 */
const loadExistingClient = async (): Promise<DbClienteModel> => {
    const result = await KnexHelper.forTenant().table('cliente').first();
    return result as DbClienteModel;
};

const loadExistingCar = async (car: number): Promise<DbCarroModel> => {
    const result = await KnexHelper.forTenant().table('carro').where({ id_carro: car }).first();
    return result as DbCarroModel;
};
