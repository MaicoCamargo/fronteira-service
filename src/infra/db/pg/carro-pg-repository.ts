import { AddCarroModel, SaveCarroRepository } from '../../../data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import { LoadCarroByIdRepository } from '../../../data/protocols/db/carro/load-carro-by-id-repository';
import { UpdateCarroModel, UpdateCarroRepository } from '../../../data/protocols/db/carro/update-carro-repository';
import { LoadCarroByClienteIdRepository } from '../../../data/protocols/db/carro/load-carro-by-cliente-id-repository';

export class CarroPgRepository
    implements SaveCarroRepository, LoadCarroByIdRepository, UpdateCarroRepository, LoadCarroByClienteIdRepository
{
    async save(model: AddCarroModel, clienteId: number): Promise<DbCarroModel> {
        const result: any = await knexInstance('carro').insert(model).returning('*');
        const map = mapper(result);
        await knexInstance('cliente_carro').insert({ cliente_id: clienteId, carro_id: map.id_carro });
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.kilometragem });
    }

    async loadById(id: number): Promise<DbCarroModel> {
        return (await knexInstance('carro').where({ id_carro: id }).first()) as DbCarroModel;
    }

    async update(model: UpdateCarroModel): Promise<DbCarroModel> {
        const result = await knexInstance('carro').where({ id_carro: model.id_carro }).update(model).returning('*');
        const map = mapper(result);
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.kilometragem });
    }

    async loadByClienteId(id: number): Promise<DbCarroModel[]> {
        const models: any = await knexInstance('carro')
            .leftJoin('cliente_carro', 'carro.id_carro', 'cliente_carro.carro_id')
            .where({ 'cliente_carro.cliente_id': id })
            .select(['carro.id_carro', 'placa', 'modelo', 'ano', 'cor', 'kilometragem']);
        if (!models.length) return [];
        return mapper(models);
    }
}
