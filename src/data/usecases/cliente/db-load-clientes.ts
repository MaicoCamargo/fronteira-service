import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { DbClienteModel } from '../../models/db-cliente-model';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';

export class DbLoadClientes implements LoadClientes {
    constructor(
        private readonly loadClientesRepository: LoadClientesRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadEnderecoByIdRepository: LoadEnderecoByIdRepository
    ) {}

    async load(pageFilter?: PageFilter): Promise<Wrapper<ClienteModel[]>> {
        const model = await this.loadClientesRepository.load(pageFilter);
        const clientes: Array<Promise<ClienteModel>> = model.content.map(async (row: DbClienteModel) => ({
            id: row.id_cliente,
            cpf: row.cpf,
            nome: row.nome,
            telefone: row.telefone,
            lastUpdated: row.last_updated,
            carro: await this.getCarro(row.carro_id),
            endereco: await this.getEndereco(row.endereco_id)
        }));
        return { content: await Promise.all(clientes), pagination: model.pagination };
    }

    private async getCarro(id: number): Promise<CarroModel> {
        const model = await this.loadCarroByIdRepository.loadById(id);
        if (!model) return null;
        return {
            id: model.id_carro,
            cor: model.cor,
            ano: model.ano,
            quilometragem: model.kilometragem,
            modelo: model.modelo,
            placa: model.placa
        };
    }

    private async getEndereco(id: number): Promise<EnderecoModel> {
        const model = await this.loadEnderecoByIdRepository.loadById(id);
        if (!model) return null;
        return {
            id: model.id_endereco,
            cep: model.cep,
            numero: model.numero,
            complemento: model.complemento,
            cidade: model.cidade,
            rua: model.rua
        };
    }
}
