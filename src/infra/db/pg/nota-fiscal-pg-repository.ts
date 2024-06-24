import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { knexInstance } from '@/infra/db/pg/helpers/knex-helper';
import { SaveNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/save-nota-fiscal-repository';

export class NotaFiscalPgRepository implements LoadNotaFiscalByIdServicoRepository, SaveNotaFiscalRepository {
    async load(idServico: number): Promise<boolean> {
        const result = await knexInstance('nota_fiscal').where({ servico_id: idServico });
        return !!result[0];
    }

    async save(idServico: number): Promise<void> {
        await knexInstance('nota_fiscal').insert({ servico_id: idServico, created_at: new Date() });
    }
}
