import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../../data/protocols/db/servico/included-item/save-included-itens-repository';
import { DbIncludedItemModel } from '../../../data/models/db-included-item-model';
import { knexInstance } from './helpers/knex-helper';
import { LoadIncludedItensRepository } from '../../../data/protocols/db/servico/included-item/load-included-itens-repository';
import {
    UpdateIncludedItemModel,
    UpdateIncludedItemRepository
} from '../../../data/protocols/db/servico/included-item/update-included-item-repository';

export class IncludedItemPgRepository
    implements SaveIncludedItensRepository, LoadIncludedItensRepository, UpdateIncludedItemRepository
{
    async save(itens: SaveIncludedItemModel[]): Promise<DbIncludedItemModel[]> {
        return knexInstance('servico_peca').insert(itens).returning('*') as any;
    }

    async load(servicoId: number): Promise<DbIncludedItemModel[]> {
        return knexInstance('servico_peca')
            .innerJoin('item', 'servico_peca.peca_id', 'item.id_peca')
            .where({ servico_id: servicoId })
            .select([
                'id_servico_peca',
                'quantidade',
                'valor_por_unidade',
                'nome',
                'marca',
                'valor_total',
                'peca_id'
            ]) as any;
    }

    async update(model: UpdateIncludedItemModel): Promise<DbIncludedItemModel> {
        return knexInstance('servico_peca')
            .update(model)
            .where({ peca_id: model.peca_id, servico_id: model.servico_id })
            .returning('*') as any;
    }
}
