import { LoadClientes, LoadClientesParams } from '@/domain/usecases/cliente/load-clientes';
import { ClienteModel } from '@/domain/models/cliente-model';
import { LoadClientesDbFilter, LoadClientesRepository } from '../../protocols/db/cliente/load-clientes-repository';
import { CarroModel } from '@/domain/models/carro-model';
import { DbClienteModel } from '../../models/db-cliente-model';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';
import { EnderecoModel } from '@/domain/models/endereco-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadCarroByClienteIdRepository } from '../../protocols/db/carro/load-carro-by-cliente-id-repository';
import { Filter } from '@/main/protocols/filter';
import { GetCacheRepository } from '@/data/protocols/cache/get-cache-repository';
import { SetCacheRepository } from '@/data/protocols/cache/set-cache-repository';

export class DbLoadClientes implements LoadClientes {
    constructor(
        private readonly loadClientesRepository: LoadClientesRepository,
        private readonly loadCarroByClienteIdRepository: LoadCarroByClienteIdRepository,
        private readonly loadEnderecoByIdRepository: LoadEnderecoByIdRepository,
        private readonly getCacheRepository: GetCacheRepository,
        private readonly setCacheRepository: SetCacheRepository
    ) {}

    async load(params?: LoadClientesParams): Promise<Wrapper<ClienteModel[]>> {
        const filters: Filter<LoadClientesDbFilter> = {};
        if (params) {
            const { page, size, ...paramsWithoutPageFilter } = params;
            filters.params = paramsWithoutPageFilter;
            if (page && size) {
                filters.pageFilter = { page, size };
            }
        }

        const cacheKey = this.generateCacheKey(params);
        const cached = await this.getCacheRepository.get<Wrapper<ClienteModel[]>>(cacheKey);
        if (cached) {
            return cached;
        }

        const model = await this.loadClientesRepository.load(filters);
        const clientes: Array<Promise<ClienteModel>> = model.content.map(async (row: DbClienteModel) => ({
            id: row.id_cliente,
            cpf: row.cpf,
            nome: row.nome,
            telefone: row.telefone,
            lastUpdated: row.last_updated,
            carros: await this.getCarros(row.id_cliente),
            endereco: await this.getEndereco(row.endereco_id)
        }));
        await this.setCacheRepository.set(cacheKey, {
            content: await Promise.all(clientes),
            pagination: model.pagination
        });
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

    private generateCacheKey(params?: LoadClientesParams): string {
        const paramString = params ? JSON.stringify(params) : 'no-params';
        return `client::list:${paramString}`;
    }
}
