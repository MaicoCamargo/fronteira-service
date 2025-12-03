import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';
import { DeleteServico } from '@/domain/usecases/servico/delete-servico';
import { DeleteBillingIntegration } from '@/data/protocols/client/billing-service/delete-billing-integration';

export class DbDeleteServico implements DeleteServico {
    constructor(
        private readonly deleteServicoRepository: DeleteServicoRepository,
        private readonly deleteBillingIntegration: DeleteBillingIntegration
    ) {}

    async delete(id: number): Promise<void> {
        await this.deleteBillingIntegration.delete(id);
        await this.deleteServicoRepository.delete(id);
    }
}
