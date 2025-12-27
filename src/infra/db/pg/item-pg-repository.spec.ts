import { ItemPgRepository } from '@/infra/db/pg/item-pg-repository';
import { DbItemModel } from '@/data/models/db-item-model';
import { mockFakeSaveItemModel } from '../../../../tests/mock/mock-item';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { PageFilter } from '@/main/protocols/page-filter';
import { mockDateAdapter } from '../../../../tests/helper/mock-date-adapter';
import { DbUpdateItemModel } from '@/data/protocols/db/item/update-item-repository';
import { DbServicoModel } from '@/data/models/db-servico-model';
import { makePgServicoCreate } from '../../../../tests/mock/mock-db-servico';
import { makePgItemCreate } from '../../../../tests/mock/mock-db-item';
import { Filter } from '@/main/protocols/filter';
import { LoadServicosDbFilter } from '@/data/protocols/db/servico/load-servicos-repository';
import { DbItemsDbFilter } from '@/data/protocols/db/item/load-itens-repository';

describe('ItemPgRepository', () => {
    beforeAll(async () => {
        await KnexHelper.forTenant().table('servico_peca').del();
        await KnexHelper.forTenant().table('servico_mecanico').del();
        await KnexHelper.forTenant().table('cliente_carro').del();
        await KnexHelper.forTenant().table('servico').del();
        await KnexHelper.forTenant().table('carro').del();
        await KnexHelper.forTenant().table('item').del();
        mockDateAdapter.set(new Date());
    });

    afterAll(async () => {
        await KnexHelper.destroy();
        mockDateAdapter.reset();
    });

    describe('load()', () => {
        let createdItens: DbItemModel[];
        beforeAll(async () => {
            createdItens = await makePgItemCreate();
        });
        test('Deve retornar uma lista de item em caso de sucesso', async () => {
            const sut = makeSut();
            const result = await sut.load();
            expect(result.content).toBeTruthy();
            expect(result.content.length).toEqual(createdItens.length);
            expect(result.content).toEqual(createdItens);
        });

        test('Deve retornar uma lista de item paginada em caso de sucesso', async () => {
            const sut = makeSut();
            const filter: Filter<DbItemsDbFilter> = {
                pageFilter: {
                    page: 1,
                    size: 2
                }
            };
            const wrapper = await sut.load(filter);
            expect(wrapper.content).toBeTruthy();
            expect(wrapper.content.length).toEqual(filter.pageFilter.size);
            expect(wrapper.content).toEqual(createdItens);
            expect(wrapper.pagination).toBeTruthy();
            expect(wrapper.pagination.total).toEqual(createdItens.length);
        });

        test('Deve retornar uma lista de item paginada e filtrado pelo nome em caso de sucesso', async () => {
            const sut = makeSut();
            const filter: Filter<DbItemsDbFilter> = {
                pageFilter: {
                    page: 1,
                    size: 2
                },
                params: {
                    label: createdItens[0].nome
                }
            };
            const wrapper = await sut.load(filter);
            expect(wrapper.content).toBeTruthy();
            expect(wrapper.content.length).toEqual(1);
            expect(wrapper.content).toEqual([createdItens[0]]);
            expect(wrapper.pagination).toBeTruthy();
            expect(wrapper.pagination.total).toEqual(1);
        });
    });

    describe('save()', () => {
        test('Deve retornar criar um item em caso de sucesso', async () => {
            const sut = makeSut();
            const item = mockFakeSaveItemModel();
            const result = await sut.save(item);
            expect(result).toBeTruthy();
            expect(result.id_peca).toBeTruthy();
            expect(result.nome).toEqual(item.nome);
            expect(result.marca).toEqual(item.marca);
            expect(result.valor).toEqual(item.valor);
        });
    });

    describe('update()', () => {
        test('Deve retornar atualizar um item em caso de sucesso', async () => {
            const sut = makeSut();
            const createdItens = await makePgItemCreate();
            const item: DbUpdateItemModel = {
                id_peca: createdItens[0].id_peca,
                nome: 'other_nome',
                marca: 'other_marca',
                valor: 11
            };
            const result = await sut.update(item);
            expect(result).toBeTruthy();
            expect(result.id_peca).toEqual(item.id_peca);
            expect(result.nome).toEqual(item.nome);
            expect(result.marca).toEqual(item.marca);
            expect(result.valor).toEqual(item.valor);

            const dbItem = await await KnexHelper.forTenant().table('item').where({ id_peca: item.id_peca }).first();
            expect(dbItem.last_updated).toEqual(new Date());
        });
    });

    describe('loadByServico()', () => {
        test('Deve retornar uma lista de item em caso de sucesso', async () => {
            const createdItens = await makePgItemCreate();
            const dbServicoModels: DbServicoModel[] = await makePgServicoCreate();
            await KnexHelper.forTenant()
                .table('servico_peca')
                .insert([
                    {
                        servico_id: dbServicoModels[0].id_servico,
                        peca_id: createdItens[0].id_peca
                    },
                    {
                        servico_id: dbServicoModels[0].id_servico,
                        peca_id: createdItens[1].id_peca
                    }
                ]);
            const sut = makeSut();
            const result = await sut.loadByServico(dbServicoModels[0].id_servico);
            expect(result).toBeTruthy();
            expect(result.length).toEqual(2);
            expect(result[0].marca).toEqual(createdItens[0].marca);
            expect(result[0].nome).toEqual(createdItens[0].nome);
            expect(result[0].valor).toEqual(createdItens[0].valor);
        });
    });

    describe('delete()', () => {
        test('Deve deletar um item em caso de sucesso', async () => {
            const created: DbItemModel[] = await makePgItemCreate();
            const sut = makeSut();
            await sut.delete(created[0].id_peca);
            const dbItem = await KnexHelper.forTenant().table('item').where({ id_peca: created[0].id_peca }).first();
            expect(dbItem).toBeUndefined();
        });
    });
});

const makeSut = (): ItemPgRepository => {
    return new ItemPgRepository();
};
