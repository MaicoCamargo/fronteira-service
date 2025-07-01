import { LoadServicos, LoadServicosParams } from '@/domain/usecases/servico/load-servicos';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { IncludedItemModel, ServicoModel } from '@/domain/models/servico-model';
import { LoadServicosDbFilter, LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '@/domain/models/carro-model';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import { Filter } from '@/main/protocols/filter';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { BillingModel } from '@/domain/models/billing-model';
import { LoadBillingByOrderIdIntegration } from '@/data/protocols/client/billing-service/load-billing-by-order-id-integration';

export class DbLoadServicos implements LoadServicos {
    constructor(
        private readonly loadServicosRepository: LoadServicosRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadIncludedItensRepository: LoadIncludedItensRepository,
        private readonly loadClienteByIdServicoRepository: LoadClienteByIdServicoRepository,
        private readonly loadNotaFiscalByIdServicoRepository: LoadNotaFiscalByIdServicoRepository,
        private readonly loadMechanicsByIdServicoRepository: LoadMechanicsByIdServicoRepository,
        private readonly loadBillingByOrderIdIntegration: LoadBillingByOrderIdIntegration
    ) {}

    async load(params?: LoadServicosParams): Promise<Wrapper<ServicoModel[]>> {
        const filters: Filter<LoadServicosDbFilter> = {};
        if (params) {
            const { page, size, ...paramsWithoutPageFilter } = params;
            filters.params = paramsWithoutPageFilter;
            if (page && size) {
                filters.pageFilter = { page, size };
            }
        }

        const loaded = await this.loadServicosRepository.load(filters);
        const servicos: Array<Promise<ServicoModel>> = loaded.content.map(async (item) => ({
            lastUpdate: item.last_updated,
            id: item.id_servico,
            valor: item.valor,
            descricao: item.descricao,
            data: item.data,
            quilometragem: item.quilometragem,
            carro: await this.loadCarroById(item.carro_id),
            itens: await this.loadItens(item.id_servico),
            cliente: await this.loadCliente(item.id_servico),
            nota: await this.loadNotaFiscalByIdServicoRepository.load(item.id_servico),
            mecanicos: await this.loadMechanics(item.id_servico),
            billing: await this.loadBillingByOrderId(item.id_servico)
        }));
        return { content: await Promise.all(servicos), pagination: loaded.pagination };
    }

    private async loadCarroById(id: number): Promise<CarroModel> {
        const model = await this.loadCarroByIdRepository.loadById({ id_carro: id });
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

    private async loadMechanics(servicoId: number): Promise<MechanicModel[]> {
        const wrapper = await this.loadMechanicsByIdServicoRepository.loadByIdServico(servicoId);
        return wrapper.content.map((dbMechanicModel) => ({
            id: dbMechanicModel.id_mecanico,
            name: dbMechanicModel.nome
        }));
    }

    private async loadBillingByOrderId(servicoId: number): Promise<BillingModel> {
        const wrapper = await this.loadBillingByOrderIdIntegration.loadByOrderId(servicoId);
        if (wrapper.content === null || wrapper.content?.length === 0) return null;
        const billing = wrapper.content[0];
        return {
            id: billing.id,
            name: billing.name,
            description: billing.description,
            amount: billing.amount,
            order: billing.order,
            payments: billing.payments,
            createdAt: billing.createdAt,
            status: billing.status
        };
    }
}
