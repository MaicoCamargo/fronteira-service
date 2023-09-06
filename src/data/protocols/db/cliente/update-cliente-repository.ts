import { DbClienteModel } from '../../../models/db-cliente-model';

interface UpdateClienteModel {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
}

export interface UpdateClienteRepository {
    update: (model: UpdateClienteModel) => Promise<DbClienteModel>;
}
