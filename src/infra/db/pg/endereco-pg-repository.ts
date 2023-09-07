import {
    SaveEnderecoRepository,
    DbAddEnderecoModel
} from '../../../data/protocols/db/endereco/save-endereco-repository';
import { DbEnderecoModel } from '../../../data/models/db-endereco-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';

export class EnderecoPgRepository implements SaveEnderecoRepository {
    async save(endereco: DbAddEnderecoModel): Promise<DbEnderecoModel> {
        return mapper(await knexInstance('endereco').insert(endereco).returning('*'));
    }
}
