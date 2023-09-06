import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';

export class DbUpdateCliente implements UpdateCliente {
    constructor(private readonly updateClienteRepository: UpdateClienteRepository) {}

    async update(cliente: UpdateClienteParams): Promise<ClienteModel> {
        await this.updateClienteRepository.update({
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpf,
            telefone: cliente.telefone
        });
        return await Promise.resolve(undefined);
    }
}
