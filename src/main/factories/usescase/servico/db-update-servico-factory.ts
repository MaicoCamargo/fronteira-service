import { DbUpdateServico } from '../../../../data/usecases/servico/db-update-servico';
import { ServicoPgRepository } from '../../../../infra/db/pg/servico-pg-repository';
import { CarroPgRepository } from '../../../../infra/db/pg/carro-pg-repository';
import { ClientePgRepository } from '../../../../infra/db/pg/cliente-pg-repository';
import { IncludedItemPgRepository } from '../../../../infra/db/pg/included-item-pg-repository';
import { NotaFiscalPgRepository } from '@/infra/db/pg/nota-fiscal-pg-repository';
import { MechanicPgRepository } from '@/infra/db/pg/mechanic-pg-repository';

export const makeDbUpdateServico = (): DbUpdateServico => {
    const servicoPgRepository = new ServicoPgRepository();
    const carroPgRepository = new CarroPgRepository();
    const clientePgRepository = new ClientePgRepository();
    const includedItemPgRepository = new IncludedItemPgRepository();
    const notaFiscalPgRepository = new NotaFiscalPgRepository();
    const mechanicPgRepository = new MechanicPgRepository();

    return new DbUpdateServico(
        servicoPgRepository,
        carroPgRepository,
        clientePgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        includedItemPgRepository,
        notaFiscalPgRepository,
        notaFiscalPgRepository,
        mechanicPgRepository
    );
};
