import { DbEnderecoModel } from '../../src/data/models/db-endereco-model';
import { mapper } from '../../src/infra/db/pg/helpers/mapper';
import { KnexHelper } from '../../src/infra/db/pg/helpers/knex-helper';

export const makePgEnderecoCreate = async (): Promise<DbEnderecoModel> => {
    return mapper(
        await KnexHelper.forTenant()
            .table('endereco')
            .insert({
                rua: 'any_rua',
                cidade: 'any_cidade',
                cep: 'any_cep',
                numero: 'any_numero',
                complemento: 'any_complemento'
            })
            .returning('*')
    );
};
