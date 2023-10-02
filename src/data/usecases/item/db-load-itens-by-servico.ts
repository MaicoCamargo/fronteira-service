import { LoadItensByIdServico } from '../../../domain/usecases/item/load-itens-by-id-servico';
import { ItemModel } from '../../../domain/models/item-model';
import { LoadItensByServicoRepository } from '../../protocols/db/item/load-itens-by-servico-repository';

export class DbLoadItensByServico implements LoadItensByIdServico {
    constructor(private readonly loadItensByServicoRepository: LoadItensByServicoRepository) {}

    async load(idServico: number): Promise<ItemModel[]> {
        await this.loadItensByServicoRepository.loadByServico(idServico);
        return await Promise.resolve([]);
    }
}
