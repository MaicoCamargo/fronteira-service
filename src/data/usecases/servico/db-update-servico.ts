import { UpdateServico, UpdateServicoParams } from '@/domain/usecases/servico/update-servico';
import { IncludedItemModel, ServicoModel } from '@/domain/models/servico-model';
import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { CarroModel } from '@/domain/models/carro-model';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import {
    UpdateIncludedItemModel,
    UpdateIncludedItemRepository
} from '../../protocols/db/servico/included-item/update-included-item-repository';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { SaveIncludedItensRepository } from '../../protocols/db/servico/included-item/save-included-itens-repository';
import { DeleteIncludedItemRepository } from '../../protocols/db/servico/included-item/delete-included-item-repository';
import { LoadNotaFiscalByIdServicoRepository } from '@/data/protocols/db/servico/nota-fiscal/load-nota-fiscal-by-id-servico-repository';
import { UpdateNotaFiscalRepository } from '@/data/protocols/db/servico/nota-fiscal/update-nota-fiscal-repository';
import { MechanicModel } from '@/domain/models/mechanic-model';
import { UpdateServiceMechanicsRepository } from '@/data/protocols/db/mechanic/update-service-mechanics-repository';
import { UpdateCarroRepository } from '@/data/protocols/db/carro/update-carro-repository';

export class DbUpdateServico implements UpdateServico {
    constructor(
        private readonly updateServicoRepository: UpdateServicoRepository,
        private readonly loadClienteByIdServicoRepository: LoadClienteByIdServicoRepository,
        private readonly updateIncludedItemRepository: UpdateIncludedItemRepository,
        private readonly loadIncludedItensRepository: LoadIncludedItensRepository,
        private readonly saveIncludedItensRepository: SaveIncludedItensRepository,
        private readonly deleteIncludedItemRepository: DeleteIncludedItemRepository,
        private readonly loadNotaFiscalByIdServicoRepository: LoadNotaFiscalByIdServicoRepository,
        private readonly updateNotaFiscalRepository: UpdateNotaFiscalRepository,
        private readonly updateServiceMechanicsRepository: UpdateServiceMechanicsRepository,
        private readonly updateCarroRepository: UpdateCarroRepository
    ) {}

    async update(params: UpdateServicoParams): Promise<ServicoModel> {
        const model: UpdateServicoModel = {
            id_servico: params.id,
            descricao: params.descricao,
            valor: params.valor,
            carro_id: params.carro.id,
            quilometragem: params.quilometragem
        };
        const itens = await this.updateIncludedItens(params.itens, params.id);
        const updated = await this.updateServicoRepository.update(model);
        await this.updateNotaFiscalRepository.update(model.id_servico, params.nota);
        const carro = await this.quilometragem(model.carro_id, model.quilometragem);
        const cliente = await this.loadCliente(updated.id_servico);
        return {
            id: updated.id_servico,
            valor: updated.valor,
            descricao: updated.descricao,
            quilometragem: updated.quilometragem,
            data: updated.data,
            carro,
            itens,
            cliente,
            nota: await this.loadNotaFiscalByIdServicoRepository.load(updated.id_servico),
            mecanicos: await this.updateMechanics(updated.id_servico, params.mechanics),
            code: updated.codigo
        };
    }

    private async quilometragem(carro: number, quilometragem: number): Promise<CarroModel> {
        const model = await this.updateCarroRepository.update({ id_carro: carro, quilometragem });
        return {
            id: model.id_carro,
            modelo: model.modelo,
            placa: model.placa,
            ano: model.ano,
            cor: model.cor,
            quilometragem: model.quilometragem
        };
    }

    private async loadCliente(servicoId: number): Promise<{ nome: string; id: number }> {
        const model = await this.loadClienteByIdServicoRepository.loadByIdServico(servicoId);
        if (!model) return null;
        return {
            id: model.id_cliente,
            nome: model.nome
        };
    }

    private async updateIncludedItens(itens: IncludedItemModel[], servicoId: number): Promise<IncludedItemModel[]> {
        const currentItens = await this.loadIncludedItensRepository.load(servicoId);
        const includedItemModelList: IncludedItemModel[] = [];
        for (const item of itens) {
            const model: UpdateIncludedItemModel = {
                peca_id: item.id,
                servico_id: servicoId,
                quantidade: item.quantidade,
                valor_por_unidade: item.valor,
                valor_total: item.quantidade * item.valor
            };
            const updated = await this.updateIncludedItemRepository.update(model);
            if (!updated) {
                const saved = await this.saveIncludedItensRepository.save([model]);
                saved.map((item) =>
                    includedItemModelList.push({
                        valor: item.valor_por_unidade,
                        total: item.valor_total,
                        marca: item.marca,
                        id: item.peca_id,
                        nome: item.nome,
                        quantidade: item.quantidade
                    })
                );
            } else {
                includedItemModelList.push(item);
            }
        }
        for (const item of currentItens) {
            if (!itens.find((find) => find.id === item.peca_id)) {
                await this.deleteIncludedItemRepository.delete(item.peca_id, servicoId);
            }
        }

        return includedItemModelList;
    }

    private async updateMechanics(servicoId: number, mechanics: number[]): Promise<MechanicModel[]> {
        const dbMechanicModels = await this.updateServiceMechanicsRepository.update(servicoId, mechanics);
        return dbMechanicModels.map((value) => ({
            id: value.id_mecanico,
            name: value.firstName
        }));
    }
}
