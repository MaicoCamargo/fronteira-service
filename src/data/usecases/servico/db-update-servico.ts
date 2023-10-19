import { UpdateServico, UpdateServicoParams } from '../../../domain/usecases/servico/update-servico';
import { IncludedItemModel, ServicoModel } from '../../../domain/models/servico-model';
import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { LoadClienteByIdServicoRepository } from '../../protocols/db/cliente/load-cliente-by-id-servico-repository';
import {
    UpdateIncludedItemModel,
    UpdateIncludedItemRepository
} from '../../protocols/db/servico/included-item/update-included-item-repository';
import { LoadIncludedItensRepository } from '../../protocols/db/servico/included-item/load-included-itens-repository';
import { SaveIncludedItensRepository } from '../../protocols/db/servico/included-item/save-included-itens-repository';
import { DeleteIncludedItemRepository } from '../../protocols/db/servico/included-item/delete-included-item-repository';

export class DbUpdateServico implements UpdateServico {
    constructor(
        private readonly updateServicoRepository: UpdateServicoRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadClienteByIdServicoRepository: LoadClienteByIdServicoRepository,
        private readonly updateIncludedItemRepository: UpdateIncludedItemRepository,
        private readonly loadIncludedItensRepository: LoadIncludedItensRepository,
        private readonly saveIncludedItensRepository: SaveIncludedItensRepository,
        private readonly deleteIncludedItemRepository: DeleteIncludedItemRepository
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
        const carro = await this.loadCarroById(updated.carro_id);
        const cliente = await this.loadCliente(updated.id_servico);
        return {
            id: updated.id_servico,
            valor: updated.valor,
            descricao: updated.descricao,
            quilometragem: updated.quilometragem,
            data: updated.data,
            carro,
            itens,
            cliente
        };
    }

    private async loadCarroById(id: number): Promise<CarroModel> {
        const model = await this.loadCarroByIdRepository.loadById(id);
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
}
