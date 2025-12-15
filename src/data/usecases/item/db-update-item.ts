import { UpdateItem } from '@/domain/usecases/item/update-item';
import { ItemModel } from '@/domain/models/item-model';
import { UpdateItemRepository } from '../../protocols/db/item/update-item-repository';
import { DbItemModel } from '../../models/db-item-model';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbUpdateItem implements UpdateItem {
    private readonly LIST_CACHE_KEY: string = 'items::list';
    constructor(
        private readonly updateItemRepository: UpdateItemRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async update(item: ItemModel): Promise<ItemModel> {
        const model: DbItemModel = {
            nome: item.nome,
            marca: item.marca,
            valor: item.valor,
            id_peca: item.id
        };
        const resut = await this.updateItemRepository.update(model);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
        return {
            id: resut.id_peca,
            nome: resut.nome,
            marca: resut.marca,
            valor: resut.valor
        };
    }
}
