import { DeleteCliente } from '../../../domain/usecases/cliente/delete-cliente';
import { DeleteClienteRepository } from '../../protocols/db/cliente/delete-cliente-repository';

export class DbDeleteCliente implements DeleteCliente {
    constructor(private readonly deleteClienteRepository: DeleteClienteRepository) {}

    async delete(id: number): Promise<void> {
        await this.deleteClienteRepository.delete(id);
    }
}
