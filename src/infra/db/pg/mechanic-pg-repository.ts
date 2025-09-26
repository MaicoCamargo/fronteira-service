import { DbMechanicModel } from '@/data/models/db-mechanic-model';
import { LoadMechanicDbFilter, LoadMechanicsRepository } from '@/data/protocols/db/mechanic/load-mechanics-repository';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { knexPaginateAdapter } from '@/main/adapters/knex-paginate-adapter';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import {
    AddMechanicsModel,
    SaveServiceMechanicsRepository
} from '@/data/protocols/db/mechanic/save-service-mechanics-repository';
import { UpdateServiceMechanicsRepository } from '@/data/protocols/db/mechanic/update-service-mechanics-repository';
import { Filter } from '@/main/protocols/filter';
import { ENV } from '@/main/config/env';

export class MechanicPgRepository
    implements
        LoadMechanicsRepository,
        LoadMechanicsByIdServicoRepository,
        SaveServiceMechanicsRepository,
        UpdateServiceMechanicsRepository
{
    async load(filters?: Filter<LoadMechanicDbFilter>): Promise<Wrapper<DbMechanicModel[]>> {
        let query: any;
        if (filters?.params) {
            query = KnexHelper.forTenant()
                .table('profile')
                .leftJoin('profile_position', 'profile.id_profile', 'profile_position.profile_id')
                .whereNull('profile.dh_exclusion')
                .whereNull('profile_position.dh_exclusion')
                .where({ 'profile_position.position_id': ENV.MECHANIC_POSITION_ID })
                .select(['profile.*', 'id_profile as id_mecanico']);

            if (filters.params.firstName) {
                query.andWhereILike('firstName', `%${filters.params.firstName}%`);
            }
            if (filters.params.lastName) {
                query.andWhereILike('lastName', `%${filters.params.lastName}%`);
            }
            if (filters.params.nickname) {
                query.andWhereILike('nickname', `%${filters.params.nickname}%`);
            }
        } else {
            query = KnexHelper.forTenant()
                .table('profile')
                .leftJoin('profile_position', 'profile.id_profile', 'profile_position.profile_id')
                .whereNull('profile.dh_exclusion')
                .whereNull('profile_position.dh_exclusion')
                .where({ 'profile_position.position_id': ENV.MECHANIC_POSITION_ID })
                .select(['profile.*', 'id_profile as id_mecanico']);
        }
        query.orderBy('firstName');
        return await knexPaginateAdapter(query, filters?.pageFilter);
    }

    async loadByIdServico(servico: number): Promise<Wrapper<DbMechanicModel[]>> {
        const result = await KnexHelper.forTenant()
            .table('profile')
            .leftJoin('servico_mecanico', 'profile.id_profile', 'servico_mecanico.mecanico_id')
            .where({ servico_id: servico })
            .whereNull('servico_mecanico.dh_exclusion')
            .select(['profile.*', 'id_profile as id_mecanico']);
        return { content: result };
    }

    async save(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
        if (!mechanics || mechanics.length === 0) return [];
        const batch = mechanics.map((mechanic) => ({
            servico_id: servico,
            mecanico_id: mechanic
        }));
        await KnexHelper.forTenant().table('servico_mecanico').insert(batch);
        const wrapper = await this.loadByIdServico(servico);
        return wrapper.content;
    }

    async update(servico: number, mechanics: AddMechanicsModel): Promise<DbMechanicModel[]> {
        if (mechanics && mechanics.length > 0) {
            for (const mechanic of mechanics) {
                const found = await KnexHelper.forTenant().table('servico_mecanico').where({
                    servico_id: servico,
                    mecanico_id: mechanic
                });
                if (found.length === 0) {
                    await KnexHelper.forTenant()
                        .table('servico_mecanico')
                        .insert({ servico_id: servico, mecanico_id: mechanic });
                }
            }
        }

        await KnexHelper.forTenant()
            .table('servico_mecanico')
            .update({ dh_exclusion: null, updated_at: new Date() })
            .whereIn('mecanico_id', mechanics || [])
            .where({ servico_id: servico });
        await KnexHelper.forTenant()
            .table('servico_mecanico')
            .update({ dh_exclusion: new Date(), updated_at: new Date() })
            .whereNotIn('mecanico_id', mechanics || [])
            .where({ servico_id: servico });
        const wrapper = await this.loadByIdServico(servico);
        return wrapper.content;
    }
}
