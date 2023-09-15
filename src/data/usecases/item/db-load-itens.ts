import { LoadItens } from '../../../domain/usecases/item/load-itens';
import { ItemModel } from '../../../domain/models/item-model';
import { LoadItensRepository } from '../../protocols/db/item/load-itens-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';

export class DbLoadItens implements LoadItens {
    constructor(private readonly loadItensRepository: LoadItensRepository) {}

    async load(pageFilter?: PageFilter): Promise<Wrapper<ItemModel[]>> {
        const model = await this.loadItensRepository.load(pageFilter);
        const itens: ItemModel[] = model.content.map((item) => ({
            nome: item.nome,
            marca: item.marca,
            valor: item.valor,
            id: item.id_peca
        }));
        return { content: itens, pagination: model.pagination };
    }
}
