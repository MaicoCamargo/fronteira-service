import { DeleteItem } from '../../../domain/usecases/item/delete-item';
import { DeleteItemRepository } from '../../protocols/db/item/delete-item-repository';

export class DbDeleteItem implements DeleteItem {
    constructor(private readonly deleteItemRepository: DeleteItemRepository) {}

    async delete(id: number): Promise<void> {
        await this.deleteItemRepository.delete(id);
    }
}
