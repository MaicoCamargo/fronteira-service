import { DbIncludedItemModel } from '../../src/data/models/db-included-item-model';
import { IncludedItemModel } from '../../src/domain/models/servico-model';
import { AddItemParams } from '../../src/domain/usecases/servico/add-servico';
import { SaveIncludedItemModel } from '../../src/data/protocols/db/servico/included-item/save-included-itens-repository';

export const mockFakeDbIncludedItemModelList = (): DbIncludedItemModel[] => [
    {
        nome: 'any_nome',
        marca: 'any_marca',
        valor_por_unidade: 1,
        quantidade: 1,
        valor_total: 1,
        id_servico_peca: 1,
        peca_id: 1,
        servico_id: 1
    },
    {
        nome: 'outher_nome',
        marca: 'outher_marca',
        valor_por_unidade: 10.5,
        quantidade: 2,
        valor_total: 21,
        id_servico_peca: 2,
        peca_id: 2,
        servico_id: 1
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

export const mockFakeAddItemParams = (): AddItemParams => ({
    id: mockFakeDbIncludedItemModelList()[0].peca_id,
    nome: mockFakeDbIncludedItemModelList()[0].nome,
    quantidade: mockFakeDbIncludedItemModelList()[0].quantidade,
    valor: mockFakeDbIncludedItemModelList()[0].valor_por_unidade,
    total: mockFakeDbIncludedItemModelList()[0].valor_total,
    marca: mockFakeDbIncludedItemModelList()[0].marca
});

export const mockFakeSaveIncludedItemModelList = (): SaveIncludedItemModel[] => [
    {
        peca_id: mockFakeDbIncludedItemModelList()[0].peca_id,
        quantidade: mockFakeDbIncludedItemModelList()[0].quantidade,
        valor_por_unidade: mockFakeDbIncludedItemModelList()[0].valor_por_unidade,
        valor_total: mockFakeDbIncludedItemModelList()[0].valor_total,
        servico_id: mockFakeDbIncludedItemModelList()[0].servico_id
    }
];
