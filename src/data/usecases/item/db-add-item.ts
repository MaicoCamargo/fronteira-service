import { AddItem, AddItemParams } from '../../../domain/usecases/item/add-item';
import { SaveItemModel, SaveItemRepository } from '../../protocols/db/item/save-item-repository';
import { ItemModel } from '../../../domain/models/item-model';

export class DbAddItem implements AddItem {
    constructor(private readonly saveItemRepository: SaveItemRepository) {}

    async add(item: AddItemParams): Promise<ItemModel> {
        const model: SaveItemModel = {
            nome: item.nome,
            marca: item.marca,
            valor: item.valor
        };
        await this.saveItemRepository.save(model);
        return await Promise.resolve(undefined);
    }
}
