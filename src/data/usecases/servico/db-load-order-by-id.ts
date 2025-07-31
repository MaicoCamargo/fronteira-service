import { LoadOrderById } from '@/domain/usecases/servico/load-order-by-id';
import { IncludedItemModel, ServicoModel } from '@/domain/models/servico-model';
import { Wrapper } from '@/main/protocols/http-wrapper';
import { LoadOrderByIdRepository } from '@/data/protocols/db/servico/load-order-by-id-repository';
import { CarroModel } from '@/domain/models/carro-model';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { BillingModel } from '@/domain/models/billing-model';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { LoadMechanicsByIdServicoRepository } from '@/data/protocols/db/mechanic/load-mechanics-by-id-servico-repository';
import { LoadClienteByIdServicoRepository } from '@/data/protocols/db/cliente/load-cliente-by-id-servico-repository';
import { LoadIncludedItensRepository } from '@/data/protocols/db/servico/included-item/load-included-itens-repository';
import { LoadCarroByIdRepository } from '@/data/protocols/db/carro/load-carro-by-id-repository';
import { LoadBillingByOrderIdIntegration } from '@/data/protocols/client/billing-service/load-billing-by-order-id-integration';

export class DbLoadOrderById implements LoadOrderById {
    constructor(
        private readonly loadOrderByIdRepository: LoadOrderByIdRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadIncludedItensRepository: LoadIncludedItensRepository,
        private readonly loadClienteByIdServicoRepository: LoadClienteByIdServicoRepository,
        private readonly loadMechanicsByIdServicoRepository: LoadMechanicsByIdServicoRepository,
        private readonly loadBillingByOrderIdIntegration: LoadBillingByOrderIdIntegration,
        private readonly loadNotaFiscalByIdServicoRepository: LoadNotaFiscalByIdServicoRepository
    ) {}

    async loadById(id: number): Promise<Wrapper<ServicoModel>> {
        const model = await this.loadOrderByIdRepository.loadById(id);
        return {
            content: {
                lastUpdate: model.last_updated,
                id: model.id_servico,
                valor: model.valor,
                descricao: model.descricao,
                data: model.data,
                quilometragem: model.quilometragem,
                carro: await this.loadCarroById(model.carro_id),
                itens: await this.loadItens(model.id_servico),
                cliente: await this.loadCliente(model.id_servico),
                nota: await this.loadNotaFiscalByIdServicoRepository.load(model.id_servico),
                mecanicos: await this.loadMechanics(model.id_servico),
                billing: await this.loadBillingByOrderId(model.id_servico),
                code: model.codigo
            }
        };
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
        if (wrapper.content === null || wrapper.content?.length === 0) {
            return null;
        }
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
