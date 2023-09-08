import { EnderecoModel } from '../../models/endereco-model';

export interface LoadEnderecoById {
    loadById: (id: number) => Promise<EnderecoModel>;
}
