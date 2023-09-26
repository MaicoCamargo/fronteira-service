import { DbUpdateServico } from '../../../../data/usecases/servico/db-update-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';

export const makeDbUpdateServico = (): DbUpdateServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    return new DbUpdateServico(servicoPgRepository, carroPgRepository);
};
