import { LoadClientes } from '../../../domain/usecases/cliente/load-clientes';
import { ClienteModel } from '../../../domain/models/cliente-model';
import { LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { DbClienteModel } from '../../models/db-cliente-model';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { PageFilter } from '../../../main/protocols/page-filter';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';

export class DbLoadClientes implements LoadClientes {
    constructor(
        private readonly loadClientesRepository: LoadClientesRepository,
        private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository,
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
            carros: await this.getCarros(row.id_cliente),
            endereco: await this.getEndereco(row.endereco_id)
        }));
        return { content: await Promise.all(clientes), pagination: model.pagination };
    }

    private async getCarros(id: number): Promise<CarroModel[]> {
        const model = await this.loadCarroByClienteIdRepository.loadByClienteId(id);
        if (!model) return [];
        return model.map((carro) => ({
            id: carro.id_carro,
            cor: carro.cor,
            ano: carro.ano,
            quilometragem: carro.quilometragem,
            modelo: carro.modelo,
            placa: carro.placa
        }));
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
