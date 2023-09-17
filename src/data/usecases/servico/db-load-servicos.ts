import { LoadServicos } from '../../../domain/usecases/servico/load-servicos';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { ServicoModel } from '../../../domain/models/servico-model';
import { LoadServicosRepository } from '../../protocols/db/servico/load-servicos-repository';

export class DbLoadServicos implements LoadServicos {
    constructor(private readonly loadServicosRepository: LoadServicosRepository) {}

    async load(): Promise<Wrapper<ServicoModel[]>> {
        await this.loadServicosRepository.load();
        return await Promise.resolve(undefined);
    }
}
