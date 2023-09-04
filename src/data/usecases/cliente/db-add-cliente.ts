import { AddClienteModel, AddClienteRepository } from '../../protocols/db/cliente/add-cliente-repository';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';

export class DbAddCliente implements AddCliente {
    constructor(private readonly addClienteRepository: AddClienteRepository) {
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
        await this.addClienteRepository.save(model);
        return await Promise.resolve(undefined);
    }
}
