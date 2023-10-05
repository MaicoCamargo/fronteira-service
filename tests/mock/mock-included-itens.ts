import { DbIncludedItemModel } from '../../src/data/models/db-included-itens-model';
import { IncludedItemModel } from '../../src/domain/models/servico-model';

export const mockFakeDbIncludedItemModelList = (): DbIncludedItemModel[] => [
    {
        nome: 'any_nome',
        marca: 'any_marca',
        valor_por_unidade: 1,
        quantidade: 1,
        valor_total: 1,
        id_servico_peca: 1
    },
    {
        nome: 'outher_nome',
        marca: 'outher_marca',
        valor_por_unidade: 10.5,
        quantidade: 2,
        valor_total: 21,
        id_servico_peca: 2
    }
];

export const mockFakeIncludedItemModelList = (): IncludedItemModel[] => [
    {
        nome: mockFakeDbIncludedItemModelList()[0].nome,
        quantidade: mockFakeDbIncludedItemModelList()[0].quantidade,
        valor: mockFakeDbIncludedItemModelList()[0].valor_por_unidade,
        total: mockFakeDbIncludedItemModelList()[0].valor_total,
        marca: mockFakeDbIncludedItemModelList()[0].marca,
        id: mockFakeDbIncludedItemModelList()[0].id_servico_peca
    },
    {
        nome: mockFakeDbIncludedItemModelList()[1].nome,
        quantidade: mockFakeDbIncludedItemModelList()[1].quantidade,
        valor: mockFakeDbIncludedItemModelList()[1].valor_por_unidade,
        total: mockFakeDbIncludedItemModelList()[1].valor_total,
        marca: mockFakeDbIncludedItemModelList()[1].marca,
        id: mockFakeDbIncludedItemModelList()[1].id_servico_peca
    }
];
