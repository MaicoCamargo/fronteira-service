import { ClienteModel } from '../../models/cliente-model';

export interface UpdateClienteParams {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
}
export interface UpdateCliente {
    update: (cliente: UpdateClienteParams) => Promise<ClienteModel>;
}
