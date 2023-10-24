import { AddCarroModel, SaveCarroRepository } from '../../../data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import {
    LoadCarroByIdParams,
    LoadCarroByIdRepository
} from '../../../data/protocols/db/carro/load-carro-by-id-repository';
import { UpdateCarroModel, UpdateCarroRepository } from '../../../data/protocols/db/carro/update-carro-repository';
import { LoadCarroByClienteIdRepository } from '../../../data/protocols/db/carro/load-carro-by-cliente-id-repository';
import { DeleteCarroRepository } from '../../../data/protocols/db/carro/delete-carro-repository';

export class CarroPgRepository
    implements
        SaveCarroRepository,
        LoadCarroByIdRepository,
        UpdateCarroRepository,
        LoadCarroByClienteIdRepository,
        DeleteCarroRepository
{
    async save(model: AddCarroModel, clienteId: number): Promise<DbCarroModel> {
        const result: any = await knexInstance('carro').insert(model).returning('*');
        const map = mapper(result);
        await knexInstance('cliente_carro').insert({ cliente_id: clienteId, carro_id: map.id_carro });
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.quilometragem });
    }

    async loadById(params: LoadCarroByIdParams): Promise<DbCarroModel> {
        return (await knexInstance('carro')
            .where({ ...params })
            .first()) as DbCarroModel;
    }

    async update(model: UpdateCarroModel): Promise<DbCarroModel> {
        const result = await knexInstance('carro')
            .where({ id_carro: model.id_carro })
            .update({ ...model, last_updated: new Date() })
            .returning('*');
        const map = mapper(result);
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.quilometragem });
    }

    async loadByClienteId(id: number): Promise<DbCarroModel[]> {
        return knexInstance('carro')
            .leftJoin('cliente_carro', 'carro.id_carro', 'cliente_carro.carro_id')
            .where({ 'cliente_carro.cliente_id': id })
            .whereNull('carro.dh_exclusion')
            .whereNull('cliente_carro.dh_exclusion')
            .select(['carro.id_carro', 'placa', 'modelo', 'ano', 'cor', 'quilometragem']) as any;
    }

    async delete(id: number): Promise<void> {
        await knexInstance('cliente_carro').where({ carro_id: id }).update({ dh_exclusion: new Date() });
        await knexInstance('carro').where({ id_carro: id }).update({ dh_exclusion: new Date() });
    }
}
