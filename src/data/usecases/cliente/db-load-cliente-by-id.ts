import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { ClienteModel } from '../../../domain/models/cliente-model';

export class DbLoadClienteById implements LoadClienteById {
    constructor(private readonly loadClienteByIdRepository: LoadClienteByIdRepository) {}

    async loadById(id: number): Promise<ClienteModel> {
        const cliente = await this.loadClienteByIdRepository.loadById(id);
        if (!cliente) return null;
        return {
            id: cliente.id_cliente,
            nome: cliente.nome,
            cpf: cliente.cpf,
            telefone: cliente.telefone,
            carro: cliente.carro_id,
            endereco: cliente.endereco_id,
            lastUpdated: cliente.last_updated
        };
    }
}
