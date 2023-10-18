import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../../data/protocols/db/servico/included-item/save-included-itens-repository';
import { DbIncludedItemModel } from '../../../data/models/db-included-item-model';
import { knexInstance } from './helpers/knex-helper';
import { LoadIncludedItensRepository } from '../../../data/protocols/db/servico/included-item/load-included-itens-repository';

export class IncludedItemPgRepository implements SaveIncludedItensRepository, LoadIncludedItensRepository {
    async save(itens: SaveIncludedItemModel[]): Promise<DbIncludedItemModel[]> {
        return knexInstance('servico_peca').insert(itens).returning('*') as DbIncludedItemModel[];
    }

    async load(servicoId: number): Promise<DbIncludedItemModel[]> {
        return knexInstance('servico_peca')
            .innerJoin('item', 'servico_peca.peca_id', 'item.id_peca')
            .where({ servico_id: servicoId })
            .select([
                'id_servico_peca',
                'quantidade',
                'valor_por_unidade',
                'valor_por_unidade',
                'nome',
                'marca',
                'valor_total',
                'peca_id'
            ]) as DbIncludedItemModel[];
    }
}
