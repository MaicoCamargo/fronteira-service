import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';

export class DbAddCliente implements AddCliente {
    constructor(private readonly addClienteRepository: SaveClienteRepository) {
        this.addClienteRepository = addClienteRepository;
    }

    async add(params: AddClienteParams): Promise<ClienteModel> {
        const model: AddClienteModel = {
            cpf: params.cpf,
            nome: params.nome,
            telefone: params.telefone,
            carro_id: params.carro,
            endereco_id: params.endereco,
            last_updated: new Date()
        };
        const cliente = await this.addClienteRepository.save(model);
        return {
            id: cliente.id_cliente,
            carro: cliente.carro_id,
            endereco: cliente.endereco_id,
            lastUpdated: cliente.last_updated,
            cpf: cliente.cpf,
            nome: cliente.nome,
            telefone: cliente.telefone
        };
    }
}
