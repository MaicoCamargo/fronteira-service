import { LoadClienteById } from '../../../domain/usecases/cliente/load-cliente-by-id';
import { LoadClienteByIdRepository } from '../../protocols/db/cliente/load-cliente-by-id-repository';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';

export class DbLoadClienteById implements LoadClienteById {
    constructor(
        private readonly loadClienteByIdRepository: LoadClienteByIdRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadEnderecoByIdRepository: LoadEnderecoByIdRepository
    ) {}

    async loadById(id: number): Promise<ClienteModel> {
        const dbClienteModel = await this.loadClienteByIdRepository.loadById(id);
        if (!dbClienteModel) return null;
        const cliente: ClienteModel = {
            id: dbClienteModel.id_cliente,
            nome: dbClienteModel.nome,
            cpf: dbClienteModel.cpf,
            telefone: dbClienteModel.telefone,
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
        const endereco = await this.loadEnderecoByIdRepository.loadById(dbClienteModel.endereco_id);
        if (endereco) {
            cliente.endereco = {
                id: endereco.id_endereco,
                cep: endereco.cep,
                numero: endereco.numero,
                complemento: endereco.complemento,
                cidade: endereco.cidade,
                rua: endereco.rua
            };
        }

        return cliente;
    }
}
