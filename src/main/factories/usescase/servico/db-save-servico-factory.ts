import { DbAddServico } from '../../../../data/usecases/servico/db-add-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { IncludedItemPgRepository } from '../../../../infra/db/pg/included-item-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';

export const makeDbAddServico = (): DbAddServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();
    return new DbAddServico(
        servicoPgRepository,
        includedItemPgRepository,
        notaFiscalPgRepository,
        notaFiscalPgRepository
    );
};
