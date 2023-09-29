import { ClienteModel } from '../../models/cliente-model';
import { Wrapper } from '../../../main/protocols/http-wrapper';

export interface UpdateClienteParams {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
}
export interface UpdateCliente {
    update: (cliente: UpdateClienteParams) => Promise<Wrapper<ClienteModel>>;
}
