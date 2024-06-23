import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';
import { DbLoadServicos } from '../../../../data/usecases/servico/db-load-servicos';
import { IncludedItemPgRepository } from '../../../../infra/db/pg/included-item-pg-repository';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';

export const makeDbLoadServicos = (): DbLoadServicos => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const clientePgRepository = new ClientePgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();

    return new DbLoadServicos(
        servicoPgRepository,
        carroPgRepository,
        includedItemPgRepository,
        clientePgRepository,
        notaFiscalPgRepository
    );
};
