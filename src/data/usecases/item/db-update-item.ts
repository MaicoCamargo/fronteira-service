import { UpdateItem } from '../../../domain/usecases/item/update-item';
import { ItemModel } from '../../../domain/models/item-model';
import { UpdateItemRepository } from '../../protocols/db/item/update-item-repository';
import { DbItemModel } from '../../models/db-item-model';

export class DbUpdateItem implements UpdateItem {
    constructor(private readonly updateItemRepository: UpdateItemRepository) {}

    async update(item: ItemModel): Promise<ItemModel> {
        const model: DbItemModel = {
            nome: item.nome,
            marca: item.marca,
            valor: item.valor,
            id_peca: item.id
        };
        const resut = await this.updateItemRepository.update(model);
        return {
            id: resut.id_peca,
            nome: resut.nome,
            marca: resut.marca,
            valor: resut.valor
        };
    }
}
