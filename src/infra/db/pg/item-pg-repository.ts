import { LoadItensRepository } from '../../../data/protocols/db/item/load-itens-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { DbItemModel } from '../../../data/models/db-item-model';
import { knexInstance } from './helpers/knex-helper';
import { knexPaginateAdapter } from '../../../main/adapters/knex-paginate-adapter';
import { SaveItemModel, SaveItemRepository } from '../../../data/protocols/db/item/save-item-repository';
import { mapper } from './helpers/mapper';
import { DbUpdateItemModel, UpdateItemRepository } from '../../../data/protocols/db/item/update-item-repository';
import { LoadItensByServicoRepository } from '../../../data/protocols/db/item/load-itens-by-servico-repository';
import { DeleteItemRepository } from '../../../data/protocols/db/item/delete-item-repository';

export class ItemPgRepository
    implements
        LoadItensRepository,
        SaveItemRepository,
        UpdateItemRepository,
        LoadItensByServicoRepository,
        DeleteItemRepository
{
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbItemModel[]>> {
        const query = knexInstance('item').returning(['id_peca', 'marca', 'valor', 'nome']);
        return await knexPaginateAdapter(query, pageFilter);
    }

    async save(item: SaveItemModel): Promise<DbItemModel> {
        const result = await knexInstance('item').insert(item).returning(['id_peca', 'marca', 'valor', 'nome']);
        return mapper(result);
    }

    async update(item: DbUpdateItemModel): Promise<DbItemModel> {
        const result = await knexInstance('item')
            .update({ ...item, last_updated: new Date() })
            .where({ id_peca: item.id_peca })
            .returning(['id_peca', 'marca', 'valor', 'nome']);
        return mapper(result);
    }

    async loadByServico(servicoId: number): Promise<DbItemModel[]> {
        const result = await knexInstance('item')
            .innerJoin('servico_peca', 'item.id_peca', 'servico_peca.peca_id')
            .where({ servico_id: servicoId })
            .returning(['id_peca', 'marca', 'valor', 'nome']);
        return result;
    }

    async delete(id: number): Promise<void> {
        await knexInstance('item').where({ id_peca: id }).del();
    }
}
