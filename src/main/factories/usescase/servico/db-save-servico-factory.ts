import { DbAddServico } from '../../../../data/usecases/servico/db-add-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';

export const makeDbAddServico = (): DbAddServico => {
    const servicoPgRepository = new ServicoPgRepository();
    return new DbAddServico(servicoPgRepository);
};
