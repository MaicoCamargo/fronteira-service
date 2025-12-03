import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';
import { DeleteServico } from '@/domain/usecases/servico/delete-servico';

export class DbDeleteServico implements DeleteServico {
    constructor(private readonly deleteServicoRepository: DeleteServicoRepository) {}

    async delete(id: number): Promise<void> {
        await this.deleteServicoRepository.delete(id);
    }
}
