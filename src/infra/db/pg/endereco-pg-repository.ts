import { SaveEnderecoRepository, DbAddEnderecoModel } from '@/data/protocols/db/endereco/save-endereco-repository';
import { DbEnderecoModel } from '@/data/models/db-endereco-model';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { mapper } from '@/infra/db/pg/helpers/mapper';
import { LoadEnderecoByIdRepository } from '@/data/protocols/db/endereco/load-endereco-by-id-repository';

export class EnderecoPgRepository implements SaveEnderecoRepository, LoadEnderecoByIdRepository {
    async save(endereco: DbAddEnderecoModel): Promise<DbEnderecoModel> {
        return mapper(await KnexHelper.forTenant().table('endereco').insert(endereco).returning('*'));
    }

    async loadById(id: number): Promise<DbEnderecoModel> {
        const result: any = await KnexHelper.forTenant().table('endereco').where({ id_endereco: id });
        if (result.length <= 0) return null;
        const map = mapper(result);
        return {
            id_endereco: map.id_endereco,
            cidade: map.cidade,
            cep: map.cep,
            complemento: map.complemento,
            rua: map.rua,
            numero: map.numero
        };
    }
}
