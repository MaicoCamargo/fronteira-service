import { ClienteModel } from '../../models/cliente-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';
import { UpdateCarroParams } from '../carro/update-carro';

export interface UpdateClienteParams {
    id: number;
    nome: string;
    telefone: string;
    cpf?: string;
    carros: UpdateCarroParams[];
}
export interface UpdateCliente {
    update: (cliente: UpdateClienteParams) => Promise<Wrapper<ClienteModel>>;
}
