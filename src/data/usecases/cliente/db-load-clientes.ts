import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';

export class DbLoadClientes implements LoadClientes {
    constructor(private readonly loadClientesRepository: LoadClientesRepository) {}

    async load(): Promise<ClienteModel[]> {
        const clientes = await this.loadClientesRepository.load();
        return clientes.map((row) => ({
            id: row.id_cliente,
            cpf: row.cpf,
            nome: row.nome,
            telefone: row.telefone,
            lastUpdated: row.last_updated
        }));
    }
}
