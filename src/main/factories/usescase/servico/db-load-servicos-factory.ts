import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';
import { DbLoadServicos } from '../../../../data/usecases/servico/db-load-servicos';

export const makeDbLoadServicos = (): DbLoadServicos => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    return new DbLoadServicos(servicoPgRepository, carroPgRepository);
};
