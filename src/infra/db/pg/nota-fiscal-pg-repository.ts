import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { KnexHelper } from '@/infra/db/pg/helpers/knex-helper';
import { SaveNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/save-nota-fiscal-repository';
import { UpdateNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/update-nota-fiscal-repository';

export class NotaFiscalPgRepository
    implements LoadNotaFiscalByIdServicoRepository, SaveNotaFiscalRepository, UpdateNotaFiscalRepository
{
    async load(idServico: number): Promise<boolean> {
        const result = await KnexHelper.forTenant()
            .table('nota_fiscal')
            .where({ servico_id: idServico })
            .whereNull('dh_exclusion');
        return !!result[0];
    }

    async save(idServico: number, status: boolean): Promise<void> {
        await KnexHelper.forTenant()
            .table('nota_fiscal')
            .insert({
                servico_id: idServico,
                created_at: new Date(),
                updated_at: new Date(),
                dh_exclusion: status ? null : new Date()
            });
    }

    async update(idServico: number, status: boolean): Promise<boolean> {
        const result = KnexHelper.forTenant()
            .table('nota_fiscal')
            .where({ servico_id: idServico })
            .update({ dh_exclusion: status ? null : new Date(), updated_at: new Date() })
            .returning('*');
        if (!result[0]) {
            const saved = this.save(idServico, status);
            return !!saved[0];
        }
        return !!result[0];
    }
}
