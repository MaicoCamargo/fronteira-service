import { DbServicoModel } from '../../models/db-servico-model';
import { AddServico, AddServicoParams } from '@/domain/usecases/servico/add-servico';
import { IncludedItemModel, ServicoModel } from '@/domain/models/servico-model';
import { SaveServicoModel, SaveServicoRepository } from '../../protocols/db/servico/save-servico-repository';
import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../protocols/db/servico/included-item/save-included-itens-repository';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { SaveNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/save-nota-fiscal-repository';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { SaveServiceMechanicsRepository } from '@/data/protocols/db/mechanic/save-service-mechanics-repository';
import { UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';
import { CarroModel } from '@/domain/models/carro-model';
import {
    SaveSimpleBillingIntegration,
    SaveSimpleBillingIntegrationModel,
    SimplePaymentModel
} from '@/data/protocols/client/billing-service/save-simple-billing-integration';
import { ENV } from '@/main/config/env';
import { BillingModel } from '@/domain/models/billing-model';
import { UniqueIdRepository } from '@/infra/unique-id-repository';

export class DbAddServico implements AddServico {
    constructor(
        private readonly saveServicoRepository: SaveServicoRepository,
        private readonly saveIncludedItensRepository: SaveIncludedItensRepository,
        private readonly loadNotaFiscalByIdServicoRepository: LoadNotaFiscalByIdServicoRepository,
        private readonly saveNotaFiscalRepository: SaveNotaFiscalRepository,
        private readonly saveServiceMechanicsRepository: SaveServiceMechanicsRepository,
        private readonly updateCarroRepository: UpdateCarroRepository,
        private readonly saveSimpleBillingIntegration: SaveSimpleBillingIntegration
    ) {}

    async add(params: AddServicoParams): Promise<ServicoModel> {
        const model: SaveServicoModel = {
            valor: params.valor,
            quilometragem: params.quilometragem,
            descricao: params.descricao,
            carro_id: params.carro.id,
            code: UniqueIdRepository.generate(5, 'O')
        };
        const result: DbServicoModel = await this.saveServicoRepository.save(model);
        await this.saveNotaFiscalRepository.save(result.id_servico, params.nota || false);

        const itens = await this.saveIncludedItens(params.itens, result.id_servico);
        const billing = await this.saveBilling(params, result.id_servico);
        return {
            itens,
            id: result.id_servico,
            valor: result.valor,
            data: result.data,
            quilometragem: result.quilometragem,
            descricao: result.descricao,
            carro: await this.quilometragem(model.carro_id, model.quilometragem),
            cliente: params.cliente,
            nota: await this.loadNotaFiscalByIdServicoRepository.load(result.id_servico),
            mecanicos: await this.saveMechanics(result.id_servico, params.mechanics),
            billing,
            code: result.codigo
        };
    }

    private async saveIncludedItens(itens: IncludedItemModel[], idServico: number): Promise<IncludedItemModel[]> {
        const model: SaveIncludedItemModel[] = itens.map((item) => ({
            servico_id: idServico,
            peca_id: item.id,
            valor_total: item.quantidade * item.valor,
            quantidade: item.quantidade,
            valor_por_unidade: item.valor
        }));
        const dbItensModel = await this.saveIncludedItensRepository.save(model);
        return dbItensModel.map((item) => ({
            id: item.id_servico_peca,
            total: item.valor_total,
            marca: item.marca,
            valor: item.valor_por_unidade,
            nome: item.nome,
            quantidade: item.quantidade
        }));
    }

    private async saveMechanics(servicoId: number, mechanics: number[]): Promise<MechanicModel[]> {
        const dbMechanicModels = await this.saveServiceMechanicsRepository.save(servicoId, mechanics);
        return dbMechanicModels.map((db) => ({
            id: db.id_mecanico,
            name: db.nome
        }));
    }

    private async quilometragem(carro: number, quilometragem: number): Promise<CarroModel> {
        const dbCarroModel = await this.updateCarroRepository.update({ quilometragem, id_carro: carro });
        return {
            id: dbCarroModel.id_carro,
            ano: dbCarroModel.ano,
            cor: dbCarroModel.cor,
            quilometragem: dbCarroModel.quilometragem,
            modelo: dbCarroModel.modelo,
            placa: dbCarroModel.placa
        };
    }

    private async saveBilling(servico: AddServicoParams, servicoId: number): Promise<BillingModel> {
        const payments: SimplePaymentModel[] = servico.billing.payments.map((payment) => ({
            installments: payment.installments,
            value: payment.value,
            status: payment.status,
            type: payment.type
        }));
        // @todo obter id do usuário autenticado
        const billing: SaveSimpleBillingIntegrationModel = {
            service: Number(ENV.SERVICE.ID),
            user: 1,
            name: `Fronteira service:${servico.cliente.id}:${servico.carro.id}:${servico.valor}`,
            order: servicoId,
            description: servico.billing.description,
            amount: servico.valor,
            payments
        };
        const wrapper = await this.saveSimpleBillingIntegration.save(billing);
        const saved = wrapper.content;
        return {
            id: saved.id,
            name: saved.name,
            order: saved.order,
            description: saved.description,
            amount: saved.amount,
            createdAt: saved.createdAt,
            payments: saved.payments.map((payment) => ({
                id: payment.id,
                status: payment.status,
                type: payment.type,
                value: payment.value,
                expirationDate: payment.expirationDate,
                installment: payment.installment
            })),
            status: saved.status,
            code: saved.code
        };
    }
}
