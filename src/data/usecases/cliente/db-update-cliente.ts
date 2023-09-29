import { UpdateCliente, UpdateClienteParams } from '../../../domain/usecases/cliente/update-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { UpdateClienteRepository } from '../../protocols/db/cliente/update-cliente-repository';
import { Wrapper } from '../../../main/protocols/http-wrapper';

export class DbUpdateCliente implements UpdateCliente {
    constructor(private readonly updateClienteRepository: UpdateClienteRepository) {}

    async update(model: UpdateClienteParams): Promise<Wrapper<ClienteModel>> {
        const updated = await this.updateClienteRepository.update({
            id_cliente: model.id,
            nome: model.nome,
            cpf: model.cpf,
            telefone: model.telefone
        });
        const cliente: ClienteModel = {
            id: updated.id_cliente,
            cpf: updated.cpf,
            lastUpdated: updated.last_updated,
            telefone: updated.telefone,
            nome: updated.nome
        };
        return { content: cliente };
    }
}
