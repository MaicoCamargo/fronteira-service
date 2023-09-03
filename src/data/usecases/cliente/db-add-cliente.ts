import { AddClienteRepository } from '../../protocols/db/cliente/add-cliente-repository';
import { DbClienteModel } from '../../models/db-cliente-model';

export class DbAddCliente implements AddClienteRepository {
    constructor(private readonly addClienteRepository: AddClienteRepository) {
        this.addClienteRepository = addClienteRepository;
    }

    async add(clienteData): Promise<DbClienteModel> {
        const cliente = await this.addClienteRepository.add(clienteData);
        return cliente;
    }
}
