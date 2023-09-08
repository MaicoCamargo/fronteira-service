import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';

export class DbLoadClienteById implements LoadClienteById {
    constructor(
        private readonly loadClienteByIdRepository: LoadClienteByIdRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository
    ) {}

    async loadById(id: number): Promise<ClienteModel> {
        const dbClienteModel = await this.loadClienteByIdRepository.loadById(id);
        if (!dbClienteModel) return null;
        const cliente: ClienteModel = {
            id: dbClienteModel.id_cliente,
            nome: dbClienteModel.nome,
            cpf: dbClienteModel.cpf,
            telefone: dbClienteModel.telefone,
            endereco: dbClienteModel.endereco_id,
            lastUpdated: dbClienteModel.last_updated
        };
        const carro = await this.loadCarroByIdRepository.loadById(dbClienteModel.carro_id);
        if (carro) {
            cliente.carro = {
                id: carro.id_carro,
                cor: carro.cor,
                ano: carro.ano,
                quilometragem: carro.kilometragem,
                placa: carro.placa,
                modelo: carro.modelo
            };
        }
        return cliente;
    }
}
