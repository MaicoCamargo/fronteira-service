import { ItemModel } from '../../src/domain/models/item-model';
import { SaveItemModel } from '../../src/data/protocols/db/item/save-item-repository';
import { DbItemModel } from '../../src/data/models/db-item-model';
import { AddItemParams } from '../../src/domain/usecases/item/add-item';
import { DbUpdateItemModel } from '../../src/data/protocols/db/item/update-item-repository';

export const mockFakeItemModel = (): ItemModel => ({
    nome: 'any_nome',
    marca: 'any_marca',
    valor: 0,
    id: 1
});

export const mockFakeSaveItemModel = (): SaveItemModel => ({
    nome: 'any_nome',
    marca: 'any_marca',
    valor: 0,
    updated_at: new Date()
});

export const mockFakeDbItemModel = (): DbItemModel => ({
    nome: 'any_nome',
    marca: 'any_marca',
    valor: 0,
    id_peca: 1,
    dh_exclusion: null,
    updated_at: new Date()
});

export const mockFakeAddItemParams = (): AddItemParams => ({
    nome: 'any_nome',
    marca: 'any_marca',
    valor: 0
});

export const mockFakeUpdateItemModel = (): ItemModel => ({
    nome: 'any_nome',
    marca: 'other_marca',
    valor: 10,
    id: 1
});

export const mockFakeDbUpdateItemModel = (): DbUpdateItemModel => ({
    nome: mockFakeUpdateItemModel().nome,
    marca: mockFakeUpdateItemModel().marca,
    valor: mockFakeUpdateItemModel().valor,
    id_peca: mockFakeUpdateItemModel().id
});
