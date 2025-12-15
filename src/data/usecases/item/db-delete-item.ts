import { DeleteItem } from '@/domain/usecases/item/delete-item';
import { DeleteItemRepository } from '../../protocols/db/item/delete-item-repository';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbDeleteItem implements DeleteItem {
    private readonly LIST_CACHE_KEY: string = 'items::list';
    constructor(
        private readonly deleteItemRepository: DeleteItemRepository,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async delete(id: number): Promise<void> {
        await this.deleteItemRepository.delete(id);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
    }
}
