import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { PageFilter } from '@/main/protocols/page-filter';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';

export class MechanicPgRepository implements LoadMechanicsRepository, LoadMechanicsByIdServicoRepository {
    async load(pageFilter?: PageFilter): Promise<Wrapper<DbMechanicModel[]>> {
        const queryBuilder = knexInstance('mecanico').returning('*');
        return await knexPaginateAdapter(queryBuilder, pageFilter);
    }

    async loadByIdServico(servico: number): Promise<Wrapper<DbMechanicModel[]>> {
        const result = await knexInstance('mecanico')
            .leftJoin('servico_mecanico', 'mecanico.id_mecanico', 'servico_mecanico.mecanico_id')
            .where({ servico_id: servico })
            .whereNull('dh_exclusion');
        const mechanics: DbMechanicModel[] = result.map((row) => ({ nome: row.nome, id_mecanico: row.id_mecanico }));
        return { content: mechanics };
    }
}
