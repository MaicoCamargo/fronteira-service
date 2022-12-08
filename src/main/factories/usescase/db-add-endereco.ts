import { DbAddEndereco } from '../../../data/usecases/endereco/db-add-endereco';
import { EnderecoPgRepository } from '../../../infra/db/pg/endereco-pg-repository';

export const makeDbAddEndereco = (): DbAddEndereco => {
    const enderecoPgRepository = new EnderecoPgRepository();
    return new DbAddEndereco(enderecoPgRepository);
};
