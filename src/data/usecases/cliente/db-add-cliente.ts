import { AddClienteModel, SaveClienteRepository } from '../../protocols/db/cliente/save-cliente-repository';
import { AddCliente, AddClienteParams } from '../../../domain/usecases/cliente/add-cliente';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { SaveCarroRepository } from '../../protocols/db/carro/save-carro-repository';
import { DbCarroModel } from '../../models/db-carro-model';

export class DbAddCliente implements AddCliente {
    constructor(
        private readonly addClienteRepository: SaveClienteRepository,
        private readonly saveCarroRepository: SaveCarroRepository
    ) {}

    async add(params: AddClienteParams): Promise<ClienteModel> {
        const { carros, cpf, nome, telefone } = params;
        const model: AddClienteModel = {
            cpf,
            nome,
            telefone,
            last_updated: new Date()
        };
        const cliente = await this.addClienteRepository.save(model);
        const promises: DbCarroModel[] = [];
        carros.map(async (carro) => {
            promises.push(await this.saveCarroRepository.save(carro, cliente.id_cliente));
        });

        return {
            id: cliente.id_cliente,
            lastUpdated: cliente.last_updated,
            cpf: cliente.cpf,
            nome: cliente.nome,
            telefone: cliente.telefone
        };
    }
}
