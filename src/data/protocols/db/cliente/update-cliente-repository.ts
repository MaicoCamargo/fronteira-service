import { DbClienteModel } from '../../../models/db-cliente-model';

export interface UpdateClienteModel {
    id_cliente: number;
    nome: string;
    telefone: string;
    cpf: string;
}

export interface UpdateClienteRepository {
    update: (model: UpdateClienteModel) => Promise<DbClienteModel>;
}
