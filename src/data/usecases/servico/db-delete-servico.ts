import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';
import { DeleteServico } from '@/domain/usecases/servico/delete-servico';
import { DeleteBillingIntegration } from '@/data/protocols/client/billing-service/delete-billing-integration';
import { ScanAndDeleteCacheRepository } from '@/data/protocols/cache/scan-and-delete-cache-repository';

export class DbDeleteServico implements DeleteServico {
    private readonly LIST_CACHE_KEY: string = 'orders::list';
    constructor(
        private readonly deleteServicoRepository: DeleteServicoRepository,
        private readonly deleteBillingIntegration: DeleteBillingIntegration,
        private readonly scanAndDeleteCacheRepository: ScanAndDeleteCacheRepository
    ) {}

    async delete(id: number): Promise<void> {
        await this.deleteBillingIntegration.delete(id);
        await this.deleteServicoRepository.delete(id);
        await this.scanAndDeleteCacheRepository.scanAndDelete(this.LIST_CACHE_KEY);
    }
}
