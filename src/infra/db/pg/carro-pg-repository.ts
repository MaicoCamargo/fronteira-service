import { AddCarroModel, SaveCarroRepository } from '../../../data/protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../../data/models/db-carro-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';

export class CarroPgRepository implements SaveCarroRepository {
    async save(model: AddCarroModel): Promise<DbCarroModel> {
        const result: any = await knexInstance('carro').insert(model).returning('*');
        const map = mapper(result);
        return Object.assign({}, map, { id: map.id_carro, quilometragem: map.kilometragem });
    }
}
