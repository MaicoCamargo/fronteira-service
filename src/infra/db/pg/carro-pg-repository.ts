import { AddCarroModel, SaveCarroRepository } from '../../../data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import { LoadCarroByIdRepository } from '../../../data/protocols/db/carro/load-carro-by-id-repository';

export class CarroPgRepository implements SaveCarroRepository, LoadCarroByIdRepository {
    async save(model: AddCarroModel): Promise<DbCarroModel> {
        const result: any = await knexInstance('carro').insert(model).returning('*');
        const map = mapper(result);
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.kilometragem });
    }

    async loadById(id: number): Promise<DbCarroModel> {
        return (await knexInstance('carro').where({ id_carro: id }).first()) as DbCarroModel;
    }
}
