import { AddEndereco, AddEnderecoParams } from '../../../domain/usecases/cliente/add-endereco';
import { EnderecoModel } from '../../../domain/models/endereco-model';
import { AddEnderecoRepository } from '../../protocols/db/cliente/add-endereco-repository';

export class DbAddEndereco implements AddEndereco {
    constructor(private readonly addEnderecoRepository: AddEnderecoRepository) {}

    async add(params: AddEnderecoParams): Promise<EnderecoModel> {
        return await this.addEnderecoRepository.add(params);
    }
}
