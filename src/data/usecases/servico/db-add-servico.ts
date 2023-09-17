import { DbServicoModel } from '../../models/db-servico-model';
import { AddServico, AddServicoParams } from '../../../domain/usecases/servico/add-servico';
import { ServicoModel } from '../../../domain/models/servico-model';
import { SaveServicoModel, SaveServicoRepository } from '../../protocols/db/servico/save-servico-repository';

export class DbAddServico implements AddServico {
    constructor(private readonly saveServicoRepository: SaveServicoRepository) {}

    async add(params: AddServicoParams): Promise<ServicoModel> {
        const model: SaveServicoModel = {
            valor: params.valor,
            data: params.data,
            quilometragem: params.quilometragem,
            descricao: params.descricao,
            carro_id: params.carro.id
        };
        const result: DbServicoModel = await this.saveServicoRepository.save(model);
        return Object.assign({}, params, { id: result.id_servico }) as ServicoModel;
    }
}
