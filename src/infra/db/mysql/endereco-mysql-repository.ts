import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';

export class EnderecoMysqlRepository {
    async save(endereco: any): Promise<any> {
        return mapper(await knexInstance('endereco').insert(endereco).returning('*'));
    }
}
