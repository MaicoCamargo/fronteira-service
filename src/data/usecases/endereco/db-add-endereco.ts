import { AddEndereco, AddEnderecoParams } from '../../../domain/usecases/endereco/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { SaveEnderecoRepository } from '../../protocols/db/endereco/save-endereco-repository';

export class DbAddEndereco implements AddEndereco {
    constructor(private readonly addEnderecoRepository: SaveEnderecoRepository) {}

    async add(params: AddEnderecoParams): Promise<EnderecoModel> {
        const { id_endereco, ...endereco } = await this.addEnderecoRepository.save(params);
        return Object.assign({}, { ...endereco }, { id: id_endereco });
    }
}
