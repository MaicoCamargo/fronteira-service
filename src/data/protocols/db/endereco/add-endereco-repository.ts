import { AddEnderecoParams } from '../../../../domain/usecases/cliente/add-endereco';
import { EnderecoModel } from '../../../../domain/models/endereco-model';

export interface AddEnderecoRepository {
    save: (endereco: AddEnderecoParams) => Promise<EnderecoModel>;
}
