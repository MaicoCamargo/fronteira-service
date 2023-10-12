import { DbClienteModel } from '../../../models/db-cliente-model';

export interface LoadClienteByIdServicoRepository {
    loadByIdServico: (servicoId: number) => Promise<DbClienteModel>;
}
