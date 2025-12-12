import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { ItemModel } from '../../../domain/models/item-model';
import { LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';

export class DbLoadItens implements LoadItens {
    constructor(
        private readonly loadItensRepository: LoadItensRepository,
        private readonly getCacheRepository: GetCacheRepository,
        private readonly setCacheRepository: SetCacheRepository
    ) {}

    async load(pageFilter?: PageFilter): Promise<Wrapper<ItemModel[]>> {
        const cacheKey = this.generateCacheKey(pageFilter);
        const cached = await this.getCacheRepository.get<Wrapper<ItemModel[]>>(cacheKey);
        if (cached) {
            return cached;
        }
        const model = await this.loadItensRepository.load(pageFilter);
        const itens: ItemModel[] = model.content.map((item) => ({
            nome: item.nome,
            marca: item.marca,
            valor: item.valor,
            id: item.id_peca
        }));
        const wrapper: Wrapper<ItemModel[]> = { content: itens, pagination: model.pagination };
        await this.setCacheRepository.set(cacheKey, wrapper);
        return wrapper;
    }

    private generateCacheKey(filter: PageFilter): string {
        const paramString = filter ? JSON.stringify(filter) : 'no-params';
        return `itens::list:${paramString}`;
    }
}
