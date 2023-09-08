import { LoadEnderecoById } from '../../../domain/usecases/endereco/load-endereco-by-id';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { LoadEnderecoByIdRepository } from '../../protocols/db/endereco/load-endereco-by-id-repository';

export class DbLoadEnderecoById implements LoadEnderecoById {
    constructor(private readonly loadEnderecoByIdRepository: LoadEnderecoByIdRepository) {}

    async loadById(id: number): Promise<EnderecoModel> {
        await this.loadEnderecoByIdRepository.loadById(id);
        return await Promise.resolve(undefined);
    }
}
