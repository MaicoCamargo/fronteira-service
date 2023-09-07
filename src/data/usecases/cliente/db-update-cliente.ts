import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';

export class DbUpdateCliente implements UpdateCliente {
    constructor(private readonly updateClienteRepository: UpdateClienteRepository) {}

    async update(model: UpdateClienteParams): Promise<ClienteModel> {
        const updated = await this.updateClienteRepository.update({
            id_cliente: model.id,
            nome: model.nome,
            cpf: model.cpf,
            telefone: model.telefone
        });
        return {
            id: updated.id_cliente,
            cpf: updated.cpf,
            lastUpdated: updated.last_updated,
            carro: updated.carro_id,
            endereco: updated.endereco_id,
            telefone: updated.telefone,
            nome: updated.nome
        };
    }
}
