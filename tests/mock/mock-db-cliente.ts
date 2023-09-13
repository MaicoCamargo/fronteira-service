import { DbClienteModel } from '../../src/data/models/db-cliente-model';
import { mapper } from '../../src/infra/db/pg/helpers/mapper';
import { knexInstance } from '../../src/infra/db/pg/helpers/knex-helper';
import { makePgEnderecoCreate } from './mock-db-endereco';

export const makePgClienteCreate = async (): Promise<DbClienteModel> => {
    const randomStr = (Math.random() + 1).toString(36).substring(7);

    const endereco = await makePgEnderecoCreate();
    return mapper(
        await knexInstance('cliente')
            .insert({
                nome: randomStr,
                telefone: randomStr,
                cpf: 'any_cpf',
                endereco_id: endereco.id_endereco,
                last_updated: new Date()
            })
            .returning(['nome', 'telefone', 'cpf', 'endereco_id', 'last_updated', 'id_cliente'])
    );
};
