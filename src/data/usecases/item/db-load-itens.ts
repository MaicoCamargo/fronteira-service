import { LoadItemsParams, LoadItens } from '@/domain/usecases/item/load-itens';
import { ItemModel } from '@/domain/models/item-model';
import { DbItemsDbFilter, LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';
import { Filter } from '@/main/protocols/filter';

export class DbLoadItens implements LoadItens {
    constructor(
        private readonly loadItensRepository: LoadItensRepository,
        private readonly getCacheRepository: GetCacheRepository,
        private readonly setCacheRepository: SetCacheRepository
    ) {}

    async load(params?: LoadItemsParams): Promise<Wrapper<ItemModel[]>> {
        const cacheKey = this.generateCacheKey(params);
        const cached = await this.getCacheRepository.get<Wrapper<ItemModel[]>>(cacheKey);
        if (cached) {
            return cached;
        }
        const filters: Filter<DbItemsDbFilter> = {};
        if (params) {
            const { page, size, ...paramsWithoutPageFilter } = params;
            filters.params = paramsWithoutPageFilter;
            if (page && size) {
                filters.pageFilter = { page, size };
            }
        }
        const model = await this.loadItensRepository.load(filters);
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

    private generateCacheKey(filter: LoadItemsParams): string {
        const paramString = filter ? JSON.stringify(filter) : 'no-params';
        return `items::list:${paramString}`;
    }
}
