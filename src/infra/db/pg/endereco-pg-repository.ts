import { knexInstance } from './helpers/knex-helper';
import { mapper } from './helpers/mapper';
import { AddEnderecoRepository } from '../../../data/protocols/db/endereco/add-endereco-repository';
import { AddEnderecoParams } from '../../../domain/usecases/cliente/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';

export class EnderecoPgRepository implements AddEnderecoRepository {
    async save(endereco: AddEnderecoParams): Promise<EnderecoModel> {
        return mapper(await knexInstance('endereco').insert(endereco).returning('*'));
    }
}
