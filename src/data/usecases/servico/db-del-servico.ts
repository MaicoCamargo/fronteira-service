import { DeleteServicoRepository } from '../../protocols/db/servico/delete-servico-repository';

export class DbDelServico {
    constructor(private readonly deleteServicoRepository: DeleteServicoRepository) {}

    async delete(id: number): Promise<void> {
        await this.deleteServicoRepository.delete(id);
    }
}
