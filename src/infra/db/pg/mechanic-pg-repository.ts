import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { PageFilter } from '@/main/protocols/page-filter';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import {
    AddMechanicsModel,
    SaveServiceMechanicsRepository
} from '@/data/protocols/db/mechanic/save-service-mechanics-repository';
import { UpdateServiceMechanicsRepository } from '@/data/protocols/db/mechanic/update-service-mechanics-repository';

export class MechanicPgRepository
    implements
        LoadMechanicsRepository,
        LoadMechanicsByIdServicoRepository,
        SaveServiceMechanicsRepository,
        UpdateServiceMechanicsRepository
{
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbMechanicModel[]>> {
        const queryBuilder = knexInstance('mecanico').returning('*');
        return await knexPaginateAdapter(queryBuilder, pageFilter);
    }

    async loadByIdServico(servico: number): Promise<Wrapper<DbMechanicModel[]>> {
        const result = await knexInstance('mecanico')
            .leftJoin('servico_mecanico', 'mecanico.id_mecanico', 'servico_mecanico.mecanico_id')
            .where({ servico_id: servico })
            .whereNull('servico_mecanico.dh_exclusion');
        const mechanics: DbMechanicModel[] = result.map((row) => ({ nome: row.nome, id_mecanico: row.id_mecanico }));
        return { content: mechanics };
    }

    async save(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
        if (!mechanics) return [];
        const batch = mechanics.map((mechanic) => ({
            servico_id: servico,
            mecanico_id: mechanic
        }));
        await knexInstance('servico_mecanico').insert(batch);
        const wrapper = await this.loadByIdServico(servico);
        return wrapper.content;
    }

    async update(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
        if (mechanics && mechanics.length > 0) {
            for (const mechanic of mechanics) {
                const found = await knexInstance('servico_mecanico').where({
                    servico_id: servico,
                    mecanico_id: mechanic
                });
                if (found.length === 0) {
                    await knexInstance('servico_mecanico').insert({ servico_id: servico, mecanico_id: mechanic });
                }
            }
        }

        await knexInstance('servico_mecanico')
            .update({ dh_exclusion: null, updated_at: new Date() })
            .whereIn('mecanico_id', mechanics)
            .where({ servico_id: servico });
        await knexInstance('servico_mecanico')
            .update({ dh_exclusion: new Date(), updated_at: new Date() })
            .whereNotIn('mecanico_id', mechanics)
            .where({ servico_id: servico });
        const wrapper = await this.loadByIdServico(servico);
        return wrapper.content;
    }
}
