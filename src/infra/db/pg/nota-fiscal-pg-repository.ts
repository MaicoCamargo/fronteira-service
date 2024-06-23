import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';

export class NotaFiscalPgRepository implements LoadNotaFiscalByIdServicoRepository {
    async load(idServico: number): Promise<boolean> {
        const result = await knexInstance('nota_fiscal').where({ servico_id: idServico });
        return !!result[0];
    }
}
