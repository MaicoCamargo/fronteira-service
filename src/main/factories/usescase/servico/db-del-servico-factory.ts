import { DbDeleteServico } from '../../../../data/usecases/servico/db-delete-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';

export const makeDbDelServico = (): DbDeleteServico => {
    const servicoPgRepository = new ServicoPgRepository();
    return new DbDeleteServico(servicoPgRepository);
};
