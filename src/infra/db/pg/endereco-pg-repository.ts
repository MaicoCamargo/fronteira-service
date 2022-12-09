import {
    AddEnderecoRepository,
    DbAddEnderecoParams
} from '../../../data/protocols/db/endereco/add-endereco-repository';
import { DbEnderecoModel } from '../../../data/models/db-endereco-model';
import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';

export class EnderecoPgRepository implements AddEnderecoRepository {
    async save(endereco: DbAddEnderecoParams): Promise<DbEnderecoModel> {
        return mapper(await knexInstance('endereco').insert(endereco).returning('*'));
    }
}
