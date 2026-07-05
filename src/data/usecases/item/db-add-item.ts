import { AddItem, AddItemParams } from '../../../domain/usecases/item/add-item';
import { SaveItemModel, SaveItemRepository } from '../../protocols/db/item/save-item-repository';
import { ItemModel } from '../../../domain/models/item-model';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbAddItem implements AddItem {
    private readonly LIST_CACHE_KEY: string = 'items::list';
    constructor(
        private readonly saveItemRepository: SaveItemRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async add(item: AddItemParams): Promise<ItemModel> {
        const model: SaveItemModel = {
            nome: item.nome,
            marca: item.marca,
            valor: item.valor
        };
        const dbModel = await this.saveItemRepository.save(model);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
        return Object.assign({}, item, { id: dbModel.id_peca }) as ItemModel;
    }
}
