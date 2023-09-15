import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { ItemModel } from '../../../domain/models/item-model';
import { LoadItensRepository } from '../../protocols/db/item/load-itens-repository';

export class DbLoadItens implements LoadItens {
    constructor(private readonly loadItensRepository: LoadItensRepository) {}

    async load(): Promise<ItemModel> {
        await this.loadItensRepository.load();
        return await Promise.resolve(undefined);
    }
}
