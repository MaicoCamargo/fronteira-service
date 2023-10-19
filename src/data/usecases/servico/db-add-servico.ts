import { DbServicoModel } from '../../models/db-servico-model';
import { AddServico, AddServicoParams } from '../../../domain/usecases/servico/add-servico';
import { IncludedItemModel, ServicoModel } from '../../../domain/models/servico-model';
import { SaveServicoModel, SaveServicoRepository } from '../../protocols/db/servico/save-servico-repository';
import {
    SaveIncludedItemModel,
    SaveIncludedItensRepository
} from '../../protocols/db/servico/included-item/save-included-itens-repository';

export class DbAddServico implements AddServico {
    constructor(
        private readonly saveServicoRepository: SaveServicoRepository,
        private readonly saveIncludedItensRepository: SaveIncludedItensRepository
    ) {}

    async add(params: AddServicoParams): Promise<ServicoModel> {
        const model: SaveServicoModel = {
            valor: params.valor,
            quilometragem: params.quilometragem,
            descricao: params.descricao,
            carro_id: params.carro.id
        };
        const result: DbServicoModel = await this.saveServicoRepository.save(model);

        const itens = await this.saveIncludedItens(params.itens, result.id_servico);
        return {
            itens,
            id: result.id_servico,
            valor: result.valor,
            data: result.data,
            quilometragem: result.quilometragem,
            descricao: result.descricao,
            carro: params.carro,
            cliente: params.cliente
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
}
