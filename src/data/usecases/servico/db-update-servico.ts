import { UpdateServico, UpdateServicoParams } from '../../../domain/usecases/servico/update-servico';
import { ServicoModel } from '../../../domain/models/servico-model';
import { UpdateServicoModel, UpdateServicoRepository } from '../../protocols/db/servico/update-servico-repository';
import { LoadCarroByIdRepository } from '../../protocols/db/carro/load-carro-by-id-repository';
import { CarroModel } from '../../../domain/models/carro-model';
import { LoadItensByServicoRepository } from '../../protocols/db/item/load-itens-by-servico-repository';
import { ItemModel } from '../../../domain/models/item-model';

export class DbUpdateServico implements UpdateServico {
    constructor(
        private readonly updateServicoRepository: UpdateServicoRepository,
        private readonly loadCarroByIdRepository: LoadCarroByIdRepository,
        private readonly loadItensByServicoRepository: LoadItensByServicoRepository
    ) {}

    async update(params: UpdateServicoParams): Promise<ServicoModel> {
        const model: UpdateServicoModel = {
            id_servico: params.id,
            descricao: params.descricao,
            valor: params.valor,
            carro_id: params.carro.id,
            quilometragem: params.quilometragem,
            last_updated: new Date()
        };
        const updated = await this.updateServicoRepository.update(model);
        const carro = await this.loadCarroById(updated.carro_id);
        const itens = await this.loadItens(updated.id_servico);
        return {
            id: updated.id_servico,
            valor: updated.valor,
            descricao: updated.descricao,
            quilometragem: updated.quilometragem,
            data: updated.data,
            lastUpdate: updated.last_updated,
            carro,
            itens
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

    private async loadItens(servicoId: number): Promise<ItemModel[]> {
        const dbItemModels = await this.loadItensByServicoRepository.loadByServico(servicoId);
        return dbItemModels.map((dbItemModel) => {
            return {
                id: dbItemModel.id_peca,
                marca: dbItemModel.marca,
                valor: dbItemModel.valor,
                nome: dbItemModel.nome
            };
        });
    }
}
