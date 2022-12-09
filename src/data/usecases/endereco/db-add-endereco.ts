import { AddEndereco, AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { AddEnderecoRepository } from '../../protocols/db/endereco/add-endereco-repository';

export class DbAddEndereco implements AddEndereco {
    constructor(private readonly addEnderecoRepository: AddEnderecoRepository) {}

    async add(params: AddEnderecoParams): Promise<EnderecoModel> {
        const { id_endereco, ...endereco } = await this.addEnderecoRepository.save(params);
        return Object.assign({}, { ...endereco }, { id: id_endereco });
    }
}
