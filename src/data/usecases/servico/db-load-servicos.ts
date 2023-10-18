import { LoadServicos } from '../../../domain/usecases/servico/load-servicos';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { IncludedItemModel, ServicoModel } from '../../../domain/models/servico-model';
import { LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';
import { PageFilter } from '../../../main/protocols/page-filter';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';

export class DbLoadServicos implements LoadServicos {
    constructor(
        private readonly loadServicosRepository: LoadServicosRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadIncludedItensRepository: LoadIncludedItensRepository,
        private readonly loadClienteByIdServicoRepository: LoadClienteByIdServicoRepository
    ) {}

    async load(pageFilter?: PageFilter): Promise<Wrapper<ServicoModel[]>> {
        const loaded = await this.loadServicosRepository.load(pageFilter);
        const servicos: Array<Promise<ServicoModel>> = loaded.content.map(async (item) => ({
            lastUpdate: item.last_updated,
            id: item.id_servico,
            valor: item.valor,
            descricao: item.descricao,
            data: item.data,
            quilometragem: item.quilometragem,
            carro: await this.loadCarroById(item.carro_id),
            itens: await this.loadItens(item.id_servico),
            cliente: await this.loadCliente(item.id_servico)
        }));
        return { content: await Promise.all(servicos), pagination: loaded.pagination };
    }

    private async loadCarroById(id: number): Promise<CarroModel> {
        const model = await this.loadCarroByIdRepository.loadById(id);
        if (!model) return null;
        return {
            id: model.id_carro,
            quilometragem: model.quilometragem,
            ano: model.ano,
            modelo: model.modelo,
            placa: model.placa,
            cor: model.cor
        };
    }

    private async loadItens(servicoId: number): Promise<IncludedItemModel[]> {
        const dbIncludedItens = await this.loadIncludedItensRepository.load(servicoId);
        return dbIncludedItens.map((item) => ({
            nome: item.nome,
            valor: item.valor_por_unidade,
            marca: item.marca,
            id: item.peca_id,
            quantidade: item.quantidade,
            total: item.valor_total
        }));
    }

    private async loadCliente(servicoId: number): Promise<{ nome: string; id: number }> {
        const model = await this.loadClienteByIdServicoRepository.loadByIdServico(servicoId);
        if (!model) return null;
        return {
            id: model.id_cliente,
            nome: model.nome
        };
    }
}
